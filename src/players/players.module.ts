import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from './player.repository';
import { ImageRepository } from '../images/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository, ImageRepository])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
