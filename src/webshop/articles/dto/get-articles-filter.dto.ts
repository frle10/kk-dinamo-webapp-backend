import { IsOptional, IsString, IsDecimal, IsIn } from 'class-validator';
import { ArticleType } from '../article.type.enum';

export class GetArticlesFilterDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsIn(Object.values(ArticleType))
	type: ArticleType;

	@IsOptional()
	@IsDecimal()
	price: number;
}
