import { Repository, EntityRepository } from 'typeorm';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

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

	async registerPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
		const {
			firstName,
			lastName,
			dateOfBirth,
			type,
			position,
		} = createPlayerDto;

		const player = new Player();
		player.firstName = firstName;
		player.lastName = lastName;
		player.type = type;

		if (dateOfBirth) player.dateOfBirth = dateOfBirth;
		if (position) player.position = position;

		await player.save();
		return player;
	}

	async updatePlayer(
		player: Player,
		updatePlayerDto: UpdatePlayerDto,
	): Promise<Player> {
		const {
			firstName,
			lastName,
			dateOfBirth,
			type,
			position,
		} = updatePlayerDto;
		if (firstName) player.firstName = firstName;
		if (lastName) player.lastName = lastName;
		if (dateOfBirth) player.dateOfBirth = dateOfBirth;
		if (type) player.type = type;
		if (position) player.position = position;

		await player.save();
		return player;
	}
}
