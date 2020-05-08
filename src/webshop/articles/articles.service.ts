import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';

@Injectable()
export class ArticlesService {
	constructor(
		@InjectRepository(ArticleRepository)
		private articleRepository: ArticleRepository,
	) {}

	getArticles(articleFilterDto: GetArticlesFilterDto): Promise<Article[]> {
		return this.articleRepository.getArticles(articleFilterDto);
	}

	getArticleById(id: number): Promise<Article> {
		return this.articleRepository.findOne(id);
	}

	addArticle(articleDto: ArticleDto): Promise<Article> {
		return this.articleRepository.addArticle(articleDto);
	}

	async deleteArticle(id: number): Promise<void> {
		const result = await this.articleRepository.delete(id);

		if (!result.affected) {
			throw new NotFoundException(`Article with ID ${id} not found.`);
		}
	}

	async updateArticle(
		id: number,
		updateArticleDto: ArticleDto,
	): Promise<Article> {
		const article = await this.getArticleById(id);
		return this.articleRepository.updateArticle(article, updateArticleDto);
	}
}
