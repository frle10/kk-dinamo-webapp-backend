import {
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	Entity,
} from 'typeorm';
import { PlayerType } from './player.type.enum';
import { PlayerPosition } from './player.position.enum';
import { type } from 'os';

@Entity()
export class Player extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column('date')
	dateOfBirth: Date;

	@Column()
	type: PlayerType;

	@Column()
	position: PlayerPosition;

	@Column({ nullable: true })
	thumbnailImageId: number;
}
