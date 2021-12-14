import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Query,
  Body,
  UploadedFiles,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  IMAGE_UPLOAD_LIMIT,
  configureImageUpload,
} from '../../images/utilities/upload-utility';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  getArticles(
    @Query(ValidationPipe) articleFilterDto: GetArticlesFilterDto
  ): Promise<Article[]> {
    return this.articleService.getArticles(articleFilterDto);
  }

  @Get('/:id')
  getArticleById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addArticle(@Body() articleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.addArticle(articleDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteArticle(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.articleService.deleteArticle(id);
  }

  @Patch('/:id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    return this.articleService.updateArticle(id, updateArticleDto);
  }

  @UseInterceptors(
    FilesInterceptor(
      'images',
      IMAGE_UPLOAD_LIMIT,
      configureImageUpload('./static/images/article-images')
    )
  )
  @Post('/:id/uploadArticleImages')
  uploadArticleImages(
    @Param('id') id: number,
    @UploadedFiles() images: Express.Multer.File[]
  ): Promise<Article> {
    return this.articleService.uploadArticleImages(id, images);
  }
}
