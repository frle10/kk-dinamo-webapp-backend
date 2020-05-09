import { BadRequestException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ArticleRepository } from '../article.repository';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
	constructor(
		@InjectRepository(ArticleRepository)
		private articleRepository: ArticleRepository,
	) {
		super();
	}

	async getDiscounts() {
		const query = this.createQueryBuilder('discount');
		const discounts = await query.getMany();
		return discounts;
	}

	async addDiscount(createDiscountDto: CreateDiscountDto): Promise<Discount> {
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

		if (percentage) discount.percentage = percentage;
		if (dateStart) discount.dateStart = dateStart;
		if (dateEnd) discount.dateEnd = dateEnd;

		if (articleIds) {
			const articleIdNumbers = this.parseIds(articleIds);
			articleIdNumbers.forEach(async articleId => {
				const article = await this.articleRepository
					.findOne(articleId)
					.catch(() => undefined);
				if (article) discount.articles.push(article);
			});
		}
	}

	private parseIds(ids: string): number[] {
		const idTokens: string[] = ids.trim().split(',');
		const idNumbers: number[] = [];
		idTokens.forEach(s => {
			const id = parseInt(s);
			if (isNaN(id) || id < 1) {
				throw new BadRequestException(
					'Article IDs must be whole numbers greater than 0.',
				);
			}

			idNumbers.push(id);
		});

		return idNumbers;
	}
}
