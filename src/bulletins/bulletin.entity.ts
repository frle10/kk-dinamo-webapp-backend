import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { BulletinType } from './bulletin.type.enum';
import { ImageContainer } from '../images/image.containers.entity';

@Entity()
export class Bulletin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column()
	type: BulletinType;

	@Column('date')
	createdOn: Date;

	@Column('date')
	lastModifiedOn: Date;

	@OneToOne(() => ImageContainer, { eager: true })
	@JoinColumn()
	imageContainer: ImageContainer;
}
