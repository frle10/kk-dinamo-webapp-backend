import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
} from 'typeorm';
import { Article } from '../article.entity';

@Entity()
export class Discount extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('decimal')
	percentage: number;

	@Column('date')
	dateCreated: Date;

	@Column('date')
	dateStart: Date;

	@Column('date')
	dateEnd: Date;

	@OneToMany(
		() => Article,
		article => article.discount,
	)
	articles: Article[];
}
