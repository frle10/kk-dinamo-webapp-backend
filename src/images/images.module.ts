import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { PlayersService } from '../players/players.service';
import { PlayerRepository } from '../players/player.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([ImageRepository]),
		TypeOrmModule.forFeature([PlayerRepository]),
	],
	controllers: [ImagesController],
	providers: [ImagesService, PlayersService],
})
export class ImagesModule {}
