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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-filter.dto';

@Controller('articles')
export class ArticlesController {
    
    constructor(private articleService: ArticlesService) {}

	@Get()
	getArticles(@Query(ValidationPipe) articleFilterDto: GetArticlesFilterDto): Promise<Article[]> {
		return this.articleService.getArticles(articleFilterDto);
	}

	@Get('/:id')
	getArticleById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
		return this.articleService.getArticleById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	addArticle(@Body() articleDto: ArticleDto): Promise<Article> {
		return this.articleService.addArticle(articleDto);
	}

	@Delete('/:id')
	deleteArticle(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.articleService.deleteArticle(id);
	}

	@Patch('/:id')
	updateArticle(
		@Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: ArticleDto,
	): Promise<Article> {
		return this.articleService.updateArticle(id, updateArticleDto);
	}

}
