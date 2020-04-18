import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user.role.enum';
import {
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;

		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);
		user.role = UserRole.REGISTERED;

		try {
			await user.save();
		} catch (error) {
			if (error.code === '23505') {
				throw new ConflictException('Username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	async validateUserPassword(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<{ username: string; role: UserRole }> {
		const { username, password } = authCredentialsDto;
		const user = await this.findOne({ username });

		if (user && (await user.validatePassword(password))) {
			return { username: user.username, role: user.role };
		} else {
			return null;
		}
	}

	private hashPassword(password: string, salt: string) {
		return bcrypt.hash(password, salt);
	}
}
