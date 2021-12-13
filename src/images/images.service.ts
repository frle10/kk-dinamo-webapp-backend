import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository
  ) {}

  getImages(): Promise<Image[]> {
    return this.imageRepository.getImages();
  }

  getImageById(id: number): Promise<Image> {
    return this.imageRepository.findOne(id);
  }

  createImage(image: Express.Multer.File): Promise<Image> {
    return this.imageRepository.createImage(image);
  }

  createImages(images: Express.Multer.File[]): Promise<Image[]> {
    return this.imageRepository.createImages(images);
  }

  async deleteImage(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Image with ID ${id} not found.`);
    }
  }

  async updateImage(
    id: number,
    updateImageDto: UpdateImageDto
  ): Promise<Image> {
    const image = await this.getImageById(id);

    if (!image) {
      throw new NotFoundException('The specified image does not exist.');
    }

    return this.imageRepository.updateImage(image, updateImageDto);
  }
}
