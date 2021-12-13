import { Repository, EntityRepository } from 'typeorm';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async getImages(): Promise<Image[]> {
    const images = await this.createQueryBuilder('image').getMany();
    return images;
  }

  async createImage(image: Express.Multer.File): Promise<Image> {
    const imageEntity = new Image();
    imageEntity.filename = image.filename;
    imageEntity.filepath = image.destination;

    await imageEntity.save();
    return imageEntity;
  }

  async createImages(images: Express.Multer.File[]): Promise<Image[]> {
    const imageEntities: Image[] = [];

    await Promise.all(
      images.map(async (image) => {
        imageEntities.push(await this.createImage(image));
      })
    );

    return imageEntities;
  }

  async updateImage(
    image: Image,
    updateImageDto: UpdateImageDto
  ): Promise<Image> {
    const { altText } = updateImageDto;

    if (altText) image.altText = altText;

    await image.save();
    return image;
  }
}
