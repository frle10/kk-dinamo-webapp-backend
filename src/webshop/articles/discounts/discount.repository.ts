import { BadRequestException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ArticleRepository } from '../article.repository';
import { updateOneToManySide } from '../../../utilities/id-utility';
import { Article } from '../article.entity';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
	constructor(
		@InjectRepository(ArticleRepository)
		private articleRepository: ArticleRepository,
	) {
		super();
	}

	async getDiscounts(): Promise<Discount[]> {
		const query = this.createQueryBuilder('discount');
		const discounts = await query.getMany();
		return discounts;
	}

	addDiscount(createDiscountDto: CreateDiscountDto): Promise<Discount> {
		const discount = new Discount();
		discount.dateCreated = new Date(new Date().toISOString());

		const { percentage, dateStart, dateEnd, articleIds } = createDiscountDto;
		const updateDiscountDto = new UpdateDiscountDto();
		updateDiscountDto.percentage = percentage;
		updateDiscountDto.dateStart = dateStart;
		updateDiscountDto.dateEnd = dateEnd;
		updateDiscountDto.articleIds = articleIds;

		return this.updateDiscount(discount, updateDiscountDto);
	}

	async updateDiscount(
		discount: Discount,
		updateDiscountDto: UpdateDiscountDto,
	): Promise<Discount> {
		this.setDiscountProperties(discount, updateDiscountDto);
		await discount.save();
		return discount;
	}

	private setDiscountProperties(
		discount: Discount,
		updateDiscountDto: UpdateDiscountDto,
	): void {
		const { percentage, dateStart, dateEnd, articleIds } = updateDiscountDto;

		if (percentage) {
			if (percentage < 0 || percentage > 1) {
				throw new BadRequestException('Percentage has to be between 0 and 1.');
			}

			discount.percentage = percentage;
		}
		if (dateStart && dateEnd) {
			if (dateStart >= dateEnd) {
				throw new BadRequestException(
					'Discount start date cannot be greater than end date.',
				);
			}

			discount.dateStart = dateStart;
			discount.dateEnd = dateEnd;
		}

		if (articleIds) {
			updateOneToManySide<Article>(
				articleIds,
				this.articleRepository,
				discount.articles,
			);
		}
	}
}
