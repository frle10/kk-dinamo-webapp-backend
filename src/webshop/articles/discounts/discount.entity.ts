import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
