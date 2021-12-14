import {
  Controller,
  Post,
  UseInterceptors,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  Delete,
  Get,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import { configureImageUpload } from './utilities/upload-utility';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  /**
   * Get all images stored in the database.
   */
  @Get()
  getImages(): Promise<Image[]> {
    return this.imagesService.getImages();
  }

  /**
   * Gets the image with specified id. If it doesn't exist, 404 is returned.
   */
  @Get('/:id')
  getImageById(@Param('id', ParseIntPipe) id: number): Promise<Image> {
    return this.imagesService.getImageById(id);
  }

  /**
   * Creates a new image in the database. This does not save the actual image, but only
   * its metadata, such as filepath, filename and alt text.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnails', configureImageUpload('./static/images'))
  )
  createImage(image: Express.Multer.File): Promise<Image> {
    return this.imagesService.createImage(image);
  }

  /**
   * Deleted the image with specified id. If such an image does not exist, 404 is returned.
   */
  @Delete('/:id')
  @HttpCode(204)
  deleteImage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.imagesService.deleteImage(id);
  }

  /**
   * Updates the specified images alt text. 404 returns if no such image exists.
   */
  @Patch('/:id')
  updateImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImageDto: UpdateImageDto
  ): Promise<Image> {
    return this.imagesService.updateImage(id, updateImageDto);
  }
}
