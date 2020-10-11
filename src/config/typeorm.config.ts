import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5436,
	username: 'postgres',
	password: 'postgres',
	database: 'dinamo-database',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
};
