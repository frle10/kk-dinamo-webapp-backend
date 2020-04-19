import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
	Param,
	Query,
	Body,
} from '@nestjs/common';
import { GetBulletinsFilterDto } from './dto/get-bulletins-filter.dto';
import { BulletinsService } from './bulletins.service';
import { BulletinDto } from './dto/bulletin.dto';
import { Bulletin } from './bulletin.entity';

@Controller('bulletins')
export class BulletinsController {
	constructor(private bulletinService: BulletinsService) {}

	@Get()
	getBulletins(
		@Query(ValidationPipe) bulletinFilterDto: GetBulletinsFilterDto,
	): Promise<Bulletin[]> {
		return this.bulletinService.getBulletins(bulletinFilterDto);
	}

	@Get('/:id')
	getBulletinById(@Param('id', ParseIntPipe) id: number): Promise<Bulletin> {
		return this.bulletinService.getBulletinById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	addBulletin(@Body() bulletinDto: BulletinDto): Promise<Bulletin> {
		return this.bulletinService.addBulletin(bulletinDto);
	}

	@Delete('/:id')
	deleteBulletin(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.bulletinService.deleteBulletin(id);
	}

	@Patch('/:id')
	updateBulletin(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateBulletinDto: BulletinDto,
	): Promise<Bulletin> {
		return this.bulletinService.updateBulletin(id, updateBulletinDto);
	}
}
