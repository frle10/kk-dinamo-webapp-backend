import { Repository, EntityRepository } from 'typeorm';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { Player } from './player.entity';
import { PlayerDto } from './dto/player.dto';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
	async getPlayers(playerFilterDto: GetPlayersFilterDto): Promise<Player[]> {
		const { type, position } = playerFilterDto;
		const query = this.createQueryBuilder('player');

		if (type) {
			query.andWhere('player.type = :type', { type });
		}

		if (position) {
			query.andWhere('player.position = :position', { position });
		}

		const players = await query.getMany();
		return players;
	}

	async registerPlayer(createPlayerDto: PlayerDto): Promise<Player> {
		const player = new Player();
		this.setPlayerProperties(player, createPlayerDto);

		await player.save();
		return player;
	}

	async updatePlayer(player: Player, updatePlayerDto: PlayerDto): Promise<Player> {
		this.setPlayerProperties(player, updatePlayerDto);
		
		await player.save();
		return player;
	}

	private setPlayerProperties(player: Player, playerDto: PlayerDto) {
		const {
			firstName,
			lastName,
			dateOfBirth,
			type,
			position,
		} = playerDto;

		player.firstName = firstName;
		player.lastName = lastName;
		player.dateOfBirth = dateOfBirth;
		player.type = type;
		player.position = position;
	}
}
