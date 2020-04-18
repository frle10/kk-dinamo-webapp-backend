import { IsOptional, IsString, IsDate } from 'class-validator';
// import { BulletinType } from '../bulletin.type.enum';

export class GetBulletinsFilterDto {
	@IsOptional()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	content: string;

	/*
	@IsOptional()
	@IsDate()
	dateCreated: Date;
	*/
}
