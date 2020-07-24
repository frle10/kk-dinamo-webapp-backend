import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetBulletinsFilterDto {
	@IsOptional()
	@IsNotEmpty()
	search: string;
}
