import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import {
	configureImageUpload,
	IMAGE_UPLOAD_LIMIT,
} from './utilities/upload-utility';

@Controller('images')
export class ImagesController {
	constructor(private imagesService: ImagesService) {}

	@Post('/uploadPlayerThumbnail')
	@UseInterceptors(
		FileInterceptor(
			'thumbnail',
			configureImageUpload('./static/images/player-thumbnails'),
		),
	)
	uploadPlayerThumbnail(
		@UploadedFile() thumbnail: Express.Multer.File,
	): Promise<Image> {
		return this.imagesService.createImage(thumbnail);
	}

	@UseInterceptors(
		FilesInterceptor(
			'images',
			IMAGE_UPLOAD_LIMIT,
			configureImageUpload('./static/images/bulletin-images'),
		),
	)
	@Post('/uploadBulletinImages')
	uploadBulletinImages(
		@UploadedFiles() images: Express.Multer.File[],
	): Promise<Image[]> {
		return this.imagesService.createImages(images);
	}

	@UseInterceptors(
		FilesInterceptor(
			'images',
			IMAGE_UPLOAD_LIMIT,
			configureImageUpload('./static/images/article-images'),
		),
	)
	@Post('/uploadArticleImages')
	uploadArticleImages(
		@UploadedFiles() images: Express.Multer.File[],
	): Promise<Image[]> {
		return this.imagesService.createImages(images);
	}
}
