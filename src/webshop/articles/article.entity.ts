import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from 'typeorm';
import { ArticleType } from './article.type.enum';
import { Discount } from './discounts/discount.entity';

@Entity()
export class Article extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	type: ArticleType;

	@Column('decimal')
	price: number;

	@Column('date')
	dateCreated: Date;

	@Column('date')
	dateLastModified: Date;

	@Column('int', { array: true, nullable: true })
	images: Array<number>;

	@ManyToOne(
		() => Discount,
		discount => discount.articles,
		{ eager: true },
	)
	discount: Discount;
}
