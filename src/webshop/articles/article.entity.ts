import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ArticleType } from './article.type.enum';

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

	/*
	@OneToMany(type => Image, image => image.id, {
		cascade: true,
	})
	@JoinColumn()
	*/
	@Column("int", { array: true, nullable: true })
	images: Array<number>;

	/*
	@ManyToOne(type => Discount, discount => discount.id)
	@JoinColumn()
	*/
	@Column({ nullable: true })
	discountID: number;

}
