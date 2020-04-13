import { BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';
import { PlayerType } from './player.type.enum';
import { PlayerPosition } from './player.position.enum';

@Entity()
export class Player extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	dateRegistered: Date;

	@Column()
	dateOfBirth: Date;

	@Column()
	type: PlayerType;

	@Column()
	position: PlayerPosition;

	@Column()
	thumbnailImageId: number;
}
