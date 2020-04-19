import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
} from 'typeorm';
import { UserRole } from './user.role.enum';
import * as bcrypt from 'bcrypt';
import { IsIn } from 'class-validator';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	salt: string;

	@Column()
	@IsIn(Object.values(UserRole))
	role: UserRole;

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
