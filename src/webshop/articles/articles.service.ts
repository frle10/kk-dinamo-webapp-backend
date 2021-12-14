import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ImageRepository } from '../../images/image.repository';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository
  ) {}

  getArticles(articleFilterDto: GetArticlesFilterDto): Promise<Article[]> {
    return this.articleRepository.getArticles(articleFilterDto);
  }

  getArticleById(id: number): Promise<Article> {
    return this.articleRepository.findOne(id);
  }

  addArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleRepository.addArticle(createArticleDto);
  }

  async deleteArticle(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Article with ID ${id} not found.`);
    }
  }

  async updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    const article = await this.getArticleById(id);

    if (!article) {
      throw new NotFoundException('Specified article does not exist.');
    }

    return this.articleRepository.updateArticle(article, updateArticleDto);
  }

  async uploadArticleImages(id: number, images: Express.Multer.File[]) {
    const article = await this.getArticleById(id);

    if (!article) {
      throw new NotFoundException('Specified article does not exist.');
    }

    const imgs = await this.imageRepository.createImages(images);

    return this.articleRepository.uploadArticleImages(article, imgs);
  }
}
