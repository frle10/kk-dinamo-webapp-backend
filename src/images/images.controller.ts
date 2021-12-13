import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import {
  configureImageUpload,
  IMAGE_UPLOAD_LIMIT,
} from './utilities/upload-utility';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('/uploadPlayerThumbnail')
  @UseInterceptors(
    FilesInterceptor(
      'thumbnails',
      IMAGE_UPLOAD_LIMIT,
      configureImageUpload('./static/images/player-thumbnails')
    )
  )
  uploadPlayerThumbnails(
    @UploadedFiles() thumbnails: Express.Multer.File[]
  ): Promise<Image[]> {
    return this.imagesService.createImages(thumbnails);
  }

  @UseInterceptors(
    FilesInterceptor(
      'images',
      IMAGE_UPLOAD_LIMIT,
      configureImageUpload('./static/images/bulletin-images')
    )
  )
  @Post('/uploadBulletinImages')
  uploadBulletinImages(
    @UploadedFiles() images: Express.Multer.File[]
  ): Promise<Image[]> {
    return this.imagesService.createImages(images);
  }

  @UseInterceptors(
    FilesInterceptor(
      'images',
      IMAGE_UPLOAD_LIMIT,
      configureImageUpload('./static/images/article-images')
    )
  )
  @Post('/uploadArticleImages')
  uploadArticleImages(
    @UploadedFiles() images: Express.Multer.File[]
  ): Promise<Image[]> {
    return this.imagesService.createImages(images);
  }
}
