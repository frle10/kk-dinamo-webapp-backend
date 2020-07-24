import { IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';
// import { BulletinType } from '../bulletin.type.enum';

export class GetBulletinsFilterDto {
	@IsOptional()
	@IsNotEmpty()
	search: string;
}
