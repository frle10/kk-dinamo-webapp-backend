import { Module } from '@nestjs/common';
import { BulletinsController } from './bulletins.controller';
import { BulletinsService } from './bulletins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BulletinRepository } from './bulletin.repository';
import { ImageRepository } from '../images/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BulletinRepository, ImageRepository])],
  controllers: [BulletinsController],
  providers: [BulletinsService],
})
export class BulletinsModule {}
