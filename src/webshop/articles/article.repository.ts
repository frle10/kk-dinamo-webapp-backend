import { Repository, EntityRepository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
	async getArticles(
		articleFilterDto: GetArticlesFilterDto,
	): Promise<Article[]> {
		const { name, description, type, price } = articleFilterDto;
		const query = this.createQueryBuilder('article');

		if (name) {
			query.andWhere('article.name = :name', { name });
		}

		if (description) {
			query.andWhere('article.description = :description', { description });
		}

		if (type) {
			query.andWhere('article.type = :type', { type });
		}

		if (price) {
			query.andWhere('article.price = :price', { price });
		}

		const articles = await query.getMany();
		return articles;
	}

	async addArticle(createArticleDto: CreateArticleDto): Promise<Article> {
		const article = new Article();
		article.dateCreated = new Date(new Date().toISOString());

		const { name, description, type, price, images } = createArticleDto;
		const updateArticleDto = new UpdateArticleDto();
		updateArticleDto.name = name;
		updateArticleDto.description = description;
		updateArticleDto.type = type;
		updateArticleDto.price = price;
		updateArticleDto.images = images;
		this.setArticleProperties(article, updateArticleDto);

		await article.save();
		return article;
	}

	async updateArticle(
		article: Article,
		updateArticleDto: UpdateArticleDto,
	): Promise<Article> {
		this.setArticleProperties(article, updateArticleDto);

		await article.save();
		return article;
	}

	private setArticleProperties(
		article: Article,
		updateArticleDto: UpdateArticleDto,
	) {
		const { name, description, type, price, images } = updateArticleDto;

		if (name) article.name = name;
		if (description) article.description = description;
		if (type) article.type = type;
		if (price) {
			if (price < 0) {
				throw new BadRequestException('Article price cannot be less than 0.');
			}

			article.price = price;
		}

		article.dateLastModified = new Date(new Date().toISOString());
	}
}
