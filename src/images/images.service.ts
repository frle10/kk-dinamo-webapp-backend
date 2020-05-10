import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
	constructor(
		@InjectRepository(ImageRepository) private imageRepository: ImageRepository,
	) {}

	createImage(image: Express.Multer.File): Promise<Image> {
		return this.imageRepository.createImage(image);
	}

	createImages(images: Express.Multer.File[]): Promise<Image[]> {
		return this.imageRepository.createImages(images);
	}
}
