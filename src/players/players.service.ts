import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { PlayerRepository } from './player.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Image } from '../images/image.entity';
import { ImageRepository } from '../images/image.repository';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository
  ) {}

  getPlayers(playerFilterDto: GetPlayersFilterDto): Promise<Player[]> {
    return this.playerRepository.getPlayers(playerFilterDto);
  }

  async getPlayerById(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne(id);

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found.`);
    }

    return player;
  }

  async getPlayerPhotos(id: number): Promise<Image[]> {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['thumbnailImages'],
    });
    return player.thumbnailImages;
  }

  registerPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerRepository.registerPlayer(createPlayerDto);
  }

  async deletePlayer(id: number): Promise<void> {
    const result = await this.playerRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Player with ID ${id} not found.`);
    }
  }

  async updatePlayer(
    id: number,
    updatePlayerDto: UpdatePlayerDto
  ): Promise<Player> {
    const player = await this.getPlayerById(id);

    if (!player) {
      throw new NotFoundException('The specified player does not exist.');
    }

    return this.playerRepository.updatePlayer(player, updatePlayerDto);
  }

  async uploadPlayerThumbnails(id: number, thumbnails: Express.Multer.File[]) {
    const player = await this.getPlayerById(id);

    if (!player) {
      throw new NotFoundException('The specified player does not exist.');
    }

    const images = await this.imageRepository.createImages(thumbnails);

    return this.playerRepository.uploadPlayerThumbnails(player, images);
  }
}
