import { PlayerType } from '../player.type.enum';
import { PlayerPosition } from '../player.position.enum';
import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class PlayerDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsDate()
    dateOfBirth: Date;
    
    @IsNotEmpty()
    type: PlayerType;
    
    @IsNotEmpty()
	position: PlayerPosition;
}
