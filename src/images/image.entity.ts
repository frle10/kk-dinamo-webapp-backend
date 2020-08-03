import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from 'typeorm';
import { ImageContainer } from './image.containers.entity';

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	filePath: string;

	@Column()
	fileName: string;

	@Column({ nullable: true })
	altText: string;

	@ManyToOne(
		() => ImageContainer,
		imageContainer => imageContainer.images,
	)
	imageContainer: ImageContainer;
}
