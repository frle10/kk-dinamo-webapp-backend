import { IsNotEmpty, IsDecimal, IsISO8601, IsOptional } from 'class-validator';

export class UpdateDiscountDto {
	@IsOptional()
	@IsNotEmpty()
	@IsDecimal()
	percentage: number;

	@IsOptional()
	@IsNotEmpty()
	@IsISO8601()
	dateStart: Date;

	@IsOptional()
	@IsNotEmpty()
	@IsISO8601()
	dateEnd: Date;

	@IsOptional()
	@IsNotEmpty()
	articleIds: string;
}
