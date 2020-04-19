import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountRepository } from './discount.repository';
import { Discount } from './discount.entity';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountsService {

    constructor(
        @InjectRepository(DiscountRepository)
        private discountRepository: DiscountRepository,
    ) {}

    getDiscounts(): Promise<Discount[]> {
		return this.discountRepository.getDiscounts();
	}

	getDiscountById(id: number): Promise<Discount> {
		return this.discountRepository.findOne(id);
	}

    addDiscount(createDiscountDto: CreateDiscountDto): Promise<Discount> {
		return this.discountRepository.addDiscount(createDiscountDto);
	}

	async deleteDiscount(id: number): Promise<void> {
		const result = await this.discountRepository.delete(id);

		if (!result.affected) {
			throw new NotFoundException(`Discount with ID ${id} not found.`);
		}
	}

	async updateDiscount(id: number, updateDiscountDto: UpdateDiscountDto): Promise<Discount> {
		const discount = await this.getDiscountById(id);
        return this.discountRepository.updateDiscount(discount, updateDiscountDto);
	}

}
