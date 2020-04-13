import { IsOptional, IsIn } from 'class-validator';
import { PlayerType } from '../player.type.enum';
import { PlayerPosition } from '../player.position.enum';

export class GetPlayersFilterDto {
	@IsOptional()
	@IsIn(Object.values(PlayerType))
	type: PlayerType;

	@IsOptional()
	@IsIn(Object.values(PlayerPosition))
	position: PlayerPosition;
}
