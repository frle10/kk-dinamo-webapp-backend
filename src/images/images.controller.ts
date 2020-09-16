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
import { Player } from '../players/player.entity';
import { PlayersService } from '../players/players.service';
import { Bulletin } from '../bulletins/bulletin.entity';
import { BulletinsService } from '../bulletins/bulletins.service';

@Controller('images')
export class ImagesController {
	constructor(
		private imagesService: ImagesService,
		private playersService: PlayersService,
		private bulletinsService: BulletinsService,
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
	@Post('/uploadBulletinImages/:id')
	async uploadBulletinImages(
		@UploadedFiles() images: Express.Multer.File[],
		@Param('id') bulletinId: number,
	): Promise<Image[]> {
		const bulletin: Bulletin = await this.bulletinsService.getBulletinById(
			bulletinId,
		);
		return this.imagesService.createBulletinImages(images, bulletin);
	}
}
