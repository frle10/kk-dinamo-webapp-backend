import { BulletinType } from '../bulletin.type.enum';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class BulletinDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	content: string;

	@IsNotEmpty()
	@IsIn(Object.values(BulletinType))
	type: BulletinType;
}
