import { PlayerType } from '../player.type.enum';
import { PlayerPosition } from '../player.position.enum';
import { IsNotEmpty, IsDate, IsString, IsISO8601, IsIn } from 'class-validator';

export class PlayerDto {
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@IsNotEmpty()
	@IsISO8601({ strict: true })
	dateOfBirth: Date;

	@IsNotEmpty()
	@IsIn(Object.values(PlayerType))
	type: PlayerType;

	@IsNotEmpty()
	@IsIn(Object.values(PlayerPosition))
	position: PlayerPosition;
}
