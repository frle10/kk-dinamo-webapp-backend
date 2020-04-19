import { ArticleType } from '../article.type.enum';
import { IsNotEmpty, IsString, IsIn, IsDecimal, IsNumber } from 'class-validator';

export class ArticleDto {
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

	// @IsNotEmpty()
	@IsNumber({}, { each: true })
	images: Array<number>;
}
