import { ArticleType } from '../article.type.enum';
import { IsNotEmpty, IsString, IsIn, IsDecimal } from 'class-validator';

export class CreateArticleDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsIn(Object.values(ArticleType))
	type: ArticleType;

	@IsNotEmpty()
	@IsDecimal()
	price: number;

	@IsNotEmpty()
	images: Array<number>;
}
