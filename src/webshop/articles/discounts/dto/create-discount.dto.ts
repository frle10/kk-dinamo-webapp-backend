import { IsNotEmpty, IsDecimal, IsISO8601, IsNumber } from "class-validator";

export class CreateDiscountDto {

    @IsNotEmpty()
    @IsDecimal()
    percentage: number;

    @IsNotEmpty()
    @IsISO8601()
    dateStart: Date;

    @IsNotEmpty()
    @IsISO8601()
    dateEnd: Date;

    @IsNotEmpty()
    @IsNumber({}, { each: true })
    articleIDs: Array<number>;

}