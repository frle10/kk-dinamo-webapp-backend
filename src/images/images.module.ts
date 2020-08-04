import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { PlayersService } from '../players/players.service';
import { PlayerRepository } from '../players/player.repository';
import { BulletinsService } from '../bulletins/bulletins.service';
import { BulletinRepository } from 'src/bulletins/bulletin.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([ImageRepository]),
		TypeOrmModule.forFeature([PlayerRepository]),
		TypeOrmModule.forFeature([BulletinRepository]),
	],
	controllers: [ImagesController],
	providers: [ImagesService, PlayersService, BulletinsService],
})
export class ImagesModule {}
