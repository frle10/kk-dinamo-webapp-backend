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
	Body,
	BadRequestException,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { Discount } from './discount.entity';
import { UpdateDiscountDto } from './dto/update-discount.dto'; 
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('discounts')
export class DiscountsController {

    constructor(private discountService: DiscountsService) {}

	@Get()
	getDiscounts(): Promise<Discount[]> {
		return this.discountService.getDiscounts();
	}

	@Get('/:id')
	getDiscountById(@Param('id', ParseIntPipe) id: number): Promise<Discount> {
		return this.discountService.getDiscountById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	addDiscount(@Body() createDiscountDto: CreateDiscountDto): Promise<Discount> {
		
		if (createDiscountDto.dateEnd < createDiscountDto.dateStart) {
			throw new BadRequestException('EndDate cannot be lesser than StartDate');
		}

		if (createDiscountDto.percentage < 0 || createDiscountDto.percentage > 1) {
			throw new BadRequestException('Percentage cannot be lesser than 0 or greater than 1');
		}

		return this.discountService.addDiscount(createDiscountDto);
	}

	@Delete('/:id')
	deleteDiscount(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.discountService.deleteDiscount(id);
	}

	@Patch('/:id')
	updateDiscount(
		@Param('id', ParseIntPipe) id: number,
        @Body() updateDiscountDto: UpdateDiscountDto,
	): Promise<Discount> {
		if (updateDiscountDto.dateEnd < updateDiscountDto.dateStart) {
			throw new BadRequestException('EndDate cannot be lesser than StartDate');
		}
		return this.discountService.updateDiscount(id, updateDiscountDto);
	}

}
