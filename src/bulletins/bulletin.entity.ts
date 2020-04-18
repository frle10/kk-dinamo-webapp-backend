import { BaseEntity, OneToMany, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BulletinType } from './bulletin.type.enum';
// import { Image } from '';

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

	/*
	@OneToMany(type => Image, image => image.ID, {
		cascade: true,
	})
	@JoinColumn
	*/

	@Column("int", { array: true, nullable: true })
	images: Array<number>;

	@Column('date', { nullable: true })
	dateCreated: Date;

	@Column('date', { nullable: true })
	dateLastModified: Date;

}