import { PlayerType } from '../player.type.enum';
import { PlayerPosition } from '../player.position.enum';
import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsIn(Object.values(PlayerType))
  type: PlayerType;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(PlayerPosition))
  position: PlayerPosition;
}
