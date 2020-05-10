import { ArticleType } from '../article.type.enum';
import {
	IsNotEmpty,
	IsString,
	IsIn,
	IsDecimal,
	IsOptional,
} from 'class-validator';

export class UpdateArticleDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	description: string;

	@IsOptional()
	@IsNotEmpty()
	@IsIn(Object.values(ArticleType))
	type: ArticleType;

	@IsOptional()
	@IsNotEmpty()
	@IsDecimal()
	price: number;

	@IsOptional()
	@IsNotEmpty()
	images: Array<number>;
}
