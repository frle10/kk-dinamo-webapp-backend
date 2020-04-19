import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { DiscountRepository } from './discounts/discount.repository';
import { DiscountsController } from './discounts/discounts.controller';
import { DiscountsService } from './discounts/discounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository, DiscountRepository])],
  exports: [ArticlesService],
  controllers: [ArticlesController, DiscountsController],
  providers: [ArticlesService, DiscountsService]
})
export class ArticlesModule {}
