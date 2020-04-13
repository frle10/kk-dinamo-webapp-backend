import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), PlayersModule],
})
export class AppModule {}
