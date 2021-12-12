import { PlayerType } from '../player.type.enum';
import { PlayerPosition } from '../player.position.enum';
import {
  IsNotEmpty,
  IsDate,
  IsString,
  IsISO8601,
  IsIn,
  IsOptional,
} from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  dateOfBirth: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(PlayerType))
  type: PlayerType;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(PlayerPosition))
  position: PlayerPosition;
}
