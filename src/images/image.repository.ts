import { Repository, EntityRepository } from 'typeorm';
import { Image } from './image.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
	async createImage(image: Express.Multer.File): Promise<Image> {
		if (!image.mimetype.startsWith('image/')) {
			throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
		}
		const imageEntity = new Image();
		imageEntity.fileName = image.filename;
		imageEntity.filePath = image.destination;

		await imageEntity.save();
		return imageEntity;
	}

	async createImages(images: Express.Multer.File[]): Promise<Image[]> {
		const imageEntities = [];

		images.map(async image => {
			imageEntities.push(await this.createImage(image));
		});

		return imageEntities;
	}
}
