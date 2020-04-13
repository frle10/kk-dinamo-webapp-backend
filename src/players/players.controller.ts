import {
	Controller,
	Get,
	Param,
	Query,
	ValidationPipe,
	Post,
	Body,
	UsePipes,
	Delete,
	Patch,
	ParseIntPipe,
} from '@nestjs/common';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { PlayersService } from './players.service';
import { PlayerDto } from './dto/player.dto';
import { Player } from './player.entity';

@Controller('players')
export class PlayersController {
	constructor(private playerService: PlayersService) {}

	@Get()
	getPlayers(@Query(ValidationPipe) playerFilterDto: GetPlayersFilterDto): Promise<Player[]> {
		return this.playerService.getPlayers(playerFilterDto);
	}

	@Get('/:id')
	getPlayerById(@Param('id', ParseIntPipe) id: number): Promise<Player> {
		return this.playerService.getPlayerById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	registerPlayer(@Body() createPlayerDto: PlayerDto): Promise<Player> {
		return this.playerService.registerPlayer(createPlayerDto);
	}

	@Delete('/:id')
	deletePlayer(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.playerService.deletePlayer(id);
	}

	@Patch('/:id')
	updatePlayer(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePlayerDto: PlayerDto,
	): Promise<Player> {
		return this.playerService.updatePlayer(id, updatePlayerDto);
	}
}
