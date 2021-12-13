import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { ArticleType } from './article.type.enum';
import { Discount } from './discounts/discount.entity';
import { Image } from '../../images/image.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: ArticleType;

  @Column('decimal')
  price: number;

  @Column('date')
  dateCreated: Date;

  @Column('date')
  dateLastModified: Date;

  @ManyToOne(() => Discount, (discount) => discount.articles, { eager: true })
  discount: Discount;

  @ManyToMany(() => Image, { cascade: true })
  images: Image[];
}
