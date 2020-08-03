import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	Get,
	Param,
	Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import {
	configureImageUpload,
	IMAGE_UPLOAD_LIMIT,
} from './utilities/upload-utility';
import { Response } from 'express';
import { Player } from '../players/player.entity';
import { PlayersService } from '../players/players.service';

@Controller('images')
export class ImagesController {
	constructor(
		private imagesService: ImagesService,
		private playersService: PlayersService,
	) {}

	@Post('/uploadPlayerThumbnail/:id')
	@UseInterceptors(
		FileInterceptor(
			'thumbnail',
			configureImageUpload('./static/images/player-thumbnails'),
		),
	)
	async uploadPlayerThumbnail(
		@UploadedFile() thumbnail: Express.Multer.File,
		@Param('id') playerId: number,
	): Promise<Image> {
		const player: Player = await this.playersService.getPlayerById(playerId);
		return this.imagesService.createPlayerThumbnail(thumbnail, player);
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

	// @UseInterceptors(
	// 	FilesInterceptor(
	// 		'images',
	// 		IMAGE_UPLOAD_LIMIT,
	// 		configureImageUpload('./static/images/article-images'),
	// 	),
	// )
	// @Post('/uploadArticleImages')
	// uploadArticleImages(
	// 	@UploadedFiles() images: Express.Multer.File[],
	// ): Promise<Image[]> {
	// 	return this.imagesService.createImages(images);
	// }

	@Get('/getPlayerThumbnail/:playerId')
	async getPlayerThumbnail(
		@Param('playerId') playerId: number,
		@Res() res: Response,
	): Promise<any> {
		const player: Player = await this.playersService.getPlayerById(playerId);
		const imageName: string = player.thumbnailImage.fileName;
		res.sendFile(imageName, { root: 'static/images/player-thumbnails' });
	}
}
