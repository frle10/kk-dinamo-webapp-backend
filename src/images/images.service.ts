import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Player } from '../players/player.entity';

@Injectable()
export class ImagesService {
	constructor(
		@InjectRepository(ImageRepository) private imageRepository: ImageRepository,
	) {}

	async createPlayerThumbnail(
		image: Express.Multer.File,
		player: Player,
	): Promise<Image> {
		const thumbnail: Image = await this.imageRepository.createImage(image);
		player.thumbnailImage = thumbnail;
		await player.save();
		return thumbnail;
	}

	createImages(images: Express.Multer.File[]): Promise<Image[]> {
		return this.imageRepository.createImages(images);
	}
}
