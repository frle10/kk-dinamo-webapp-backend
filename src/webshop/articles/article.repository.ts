import { Repository, EntityRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

	async getArticles(articleFilterDto: GetArticlesFilterDto): Promise<Article[]> {
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

	async addArticle(articleDto: ArticleDto): Promise<Article> {
		const article = new Article();
		
		article.dateCreated = new Date((new Date()).toISOString());
		this.setArticleProperties(article, articleDto);

		await article.save();
		return article;
	}

	async updateArticle(article: Article, updateArticleDto): Promise<Article> {
		if (!article) {
			throw new NotFoundException('Specified article does not exist.');
		}
		this.setArticleProperties(article, updateArticleDto);

		await article.save();
		return article;
	}

	private setArticleProperties(article: Article, articleDto: ArticleDto) {
		const {
			name,
			description,
			type,
			price,
			images,
		} = articleDto;

		article.name = name;
		article.description = description;
		article.type = type;
		article.price = price;
		article.images = images;
		article.dateLastModified = new Date((new Date()).toISOString());
	}

}
