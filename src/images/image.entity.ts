import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from 'typeorm';
import { Article } from '../webshop/articles/article.entity';

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	filePath: string;

	@Column()
	fileName: string;

	@Column()
	altText: string;

	@ManyToOne(
		() => Article,
		article => article.images,
	)
	article: Article;
}
