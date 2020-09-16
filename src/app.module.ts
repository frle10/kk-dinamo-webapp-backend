import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BulletinsModule } from './bulletins/bulletins.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'static'),
		}),
		TypeOrmModule.forRoot(typeOrmConfig),
		PlayersModule,
		BulletinsModule,
		AuthModule,
		ImagesModule,
	],
})
export class AppModule {}
