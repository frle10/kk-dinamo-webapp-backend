import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
