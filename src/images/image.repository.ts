import { Repository, EntityRepository } from 'typeorm';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
	async createImage(image: Express.Multer.File): Promise<Image> {
		const imageEntity = new Image();
		imageEntity.fileName = image.filename;
		imageEntity.filePath = image.destination;

		await imageEntity.save();
		return imageEntity;
	}

	async createImages(images: Express.Multer.File[]): Promise<Image[]> {
		const imageEntities = [];

		for (const image of images) {
			const imageEntity = new Image();
			imageEntity.fileName = image.filename;
			imageEntity.filePath = image.destination;

			await imageEntity.save();
			imageEntities.push(imageEntity);
		}

		return imageEntities;
	}
}
