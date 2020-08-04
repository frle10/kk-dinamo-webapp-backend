import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Player } from '../players/player.entity';
import { Bulletin } from '../bulletins/bulletin.entity';

@Injectable()
export class ImagesService {
	constructor(
		@InjectRepository(ImageRepository) private imageRepository: ImageRepository,
	) {}

	async getImageById(imageId: number): Promise<Image> {
		const image: Image = await this.imageRepository.findOne(imageId);
		return image;
	}

	async createPlayerThumbnail(
		image: Express.Multer.File,
		player: Player,
	): Promise<Image> {
		const thumbnail: Image = await this.imageRepository.createImage(image);
		player.thumbnailImage = thumbnail;
		await player.save();
		return thumbnail;
	}

	async createBulletinImages(
		images: Express.Multer.File[],
		bulletin: Bulletin,
	): Promise<Image[]> {
		const bulletinImages: Image[] = await this.imageRepository.createImages(
			images,
		);
		bulletin.imageContainer.images = bulletinImages;
		return bulletinImages;
	}
}
