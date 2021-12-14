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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Image } from '../images/image.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  configureImageUpload,
  IMAGE_UPLOAD_LIMIT,
} from 'src/images/utilities/upload-utility';

@Controller('players')
export class PlayersController {
  constructor(private playerService: PlayersService) {}

  /**
   * Gets all players. It is possible to filter by type and position.
   */
  @Get()
  getPlayers(
    @Query(ValidationPipe) playerFilterDto: GetPlayersFilterDto
  ): Promise<Player[]> {
    return this.playerService.getPlayers(playerFilterDto);
  }

  /**
   * Gets the player with given id if it exists. If not, 404 is returned.
   */
  @Get('/:id')
  getPlayerById(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  /**
   * Gets all thumbnails of player with given id. If the player with specified id
   * does not exist, 404 is returned.
   */
  @Get('/:id/thumbnails')
  getPlayerPhotos(@Param('id', ParseIntPipe) id: number): Promise<Image[]> {
    return this.playerService.getPlayerPhotos(id);
  }

  /**
   * Registers (creates) a new player in the database.
   */
  @Post()
  @UsePipes(ValidationPipe)
  registerPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.registerPlayer(createPlayerDto);
  }

  /**
   * Deletes the player with specified id if it exists.
   */
  @Delete('/:id')
  deletePlayer(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.playerService.deletePlayer(id);
  }

  /**
   * Updates specified player's data if it exists.
   */
  @Patch('/:id')
  updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto
  ): Promise<Player> {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  /**
   * Handles image upload. It is possible to upload up to 10 images
   * for each player. This route handles only images and saves them
   * to the specified player.
   */
  @Post('/:id/uploadPlayerThumbnails')
  @UseInterceptors(
    FilesInterceptor(
      'thumbnails',
      IMAGE_UPLOAD_LIMIT,
      configureImageUpload('./static/images/player-thumbnails')
    )
  )
  uploadPlayerThumbnails(
    @Param('id') id: number,
    @UploadedFiles() thumbnails: Express.Multer.File[]
  ): Promise<Player> {
    return this.playerService.uploadPlayerThumbnails(id, thumbnails);
  }
}
