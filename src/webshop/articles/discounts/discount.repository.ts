import { Repository, EntityRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Discount } from './discount.entity';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ArticlesService } from '../articles.service';
import { ArticleDto } from '../dto/article.dto';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
	constructor(private articleService: ArticlesService) {
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

		const articleIDs = createDiscountDto.articleIDs;
		// console.log(articleIDs);

		// pa jesam li ja lud lol, kaze da je array brojeva, i onda tu ispod console.log ispisuje char po char: [ pa 1 pa , pa 2 pa , ...
		// help frle
		let count: number;
		count = 0;
		for (const articleID of articleIDs) {
			console.log(articleID, count);
			count++;
		}

		articleIDs.forEach(function(articleID) {
			console.log(`ID: ${articleID}`);
			this.articleService.getArticleById(articleID).then(article => {
				const updateArticleDto = new ArticleDto();
				updateArticleDto.name = article.name;
				updateArticleDto.description = article.description;
				updateArticleDto.type = article.type;
				updateArticleDto.price = article.price;
				updateArticleDto.images = article.images;

				this.articleService.updateArticle(articleID, updateArticleDto);
			});
		});

		const updateDiscountDto = new UpdateDiscountDto();
		updateDiscountDto.percentage = createDiscountDto.percentage;
		updateDiscountDto.dateStart = createDiscountDto.dateStart;
		updateDiscountDto.dateEnd = createDiscountDto.dateEnd;

		this.setDiscountProperties(discount, updateDiscountDto);

		await discount.save();
		return discount;
	}

	async updateDiscount(
		discount: Discount,
		updateDiscountDto,
	): Promise<Discount> {
		if (!discount) {
			throw new NotFoundException('Specified discount does not exist.');
		}
		this.setDiscountProperties(discount, updateDiscountDto);

		await discount.save();
		return discount;
	}

	private setDiscountProperties(
		discount: Discount,
		updateDiscountDto: UpdateDiscountDto,
	) {
		const { percentage, dateStart, dateEnd } = updateDiscountDto;

		discount.percentage = percentage;
		discount.dateStart = dateStart;
		discount.dateEnd = dateEnd;
	}
}
