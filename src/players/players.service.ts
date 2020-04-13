import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { PlayerRepository } from './player.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerDto } from './dto/player.dto';

@Injectable()
export class PlayersService {
	constructor(
		@InjectRepository(PlayerRepository)
		private playerRepository: PlayerRepository,
	) {}

	getPlayers(playerFilterDto: GetPlayersFilterDto): Promise<Player[]> {
    return this.playerRepository.getPlayers(playerFilterDto);
  }

	getPlayerById(id: number): Promise<Player> {
		return this.playerRepository.findOne(id);
	}

	registerPlayer(createPlayerDto: PlayerDto): Promise<Player> {
		return this.playerRepository.registerPlayer(createPlayerDto);
	}

	async deletePlayer(id: number): Promise<void> {
		const result = await this.playerRepository.delete(id);

		if (!result.affected) {
			throw new NotFoundException(`Player with ID ${id} not found.`);
		}
	}

	async updatePlayer(id: number, updatePlayerDto: PlayerDto): Promise<Player> {
		const player = await this.getPlayerById(id);
		return this.playerRepository.updatePlayer(player, updatePlayerDto);
	}
}
