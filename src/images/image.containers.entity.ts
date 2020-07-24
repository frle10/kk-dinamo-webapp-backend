import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class ImageContainer extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(
		() => Image,
		image => image.imageContainer,
		{ eager: true },
	)
	images: Image[];
}
