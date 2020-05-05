import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	Get,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v1 as uuidv1 } from 'uuid';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {
	constructor(private imagesService: ImagesService) {}
	@Get()
	re() {
		return 'adsas';
	}
	@Post('/uploadPlayerThumbnail')
	@UseInterceptors(
		FileInterceptor('thumbnail', {
			storage: diskStorage({
				destination: './static/images/player-thumbnails',
				filename: (_req, file, cb) => {
					const randomName = uuidv1();
					return cb(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	async uploadPlayerThumbnail(
		@UploadedFile() thumbnail: Express.Multer.File,
	): Promise<Image> {
		return this.imagesService.createImage(thumbnail);
	}

	@UseInterceptors(
		FilesInterceptor('images', undefined, {
			storage: diskStorage({
				destination: './static/images/bulletin-images',
				filename: (_req, file, cb) => {
					const randomName = uuidv1();
					return cb(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	@Post('/uploadBulletinImages')
	async uploadBulletinImages(
		@UploadedFiles() images: Express.Multer.File[],
	): Promise<Image[]> {
		return this.imagesService.createImages(images);
	}

	@UseInterceptors(
		FilesInterceptor('images', undefined, {
			storage: diskStorage({
				destination: './static/images/article-images',
				filename: (_req, file, cb) => {
					const randomName = uuidv1();
					return cb(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	@Post('/uploadArticleImages')
	async uploadArticleImages(
		@UploadedFiles() images: Express.Multer.File[],
	): Promise<Image[]> {
		return this.imagesService.createImages(images);
	}
}
