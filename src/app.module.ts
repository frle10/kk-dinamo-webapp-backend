import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BulletinsModule } from './bulletins/bulletins.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), PlayersModule, BulletinsModule, AuthModule],
})
export class AppModule {}
