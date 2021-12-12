import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Image, (image) => image.article, { eager: true })
  images: Image[];

  @ManyToOne(() => Discount, (discount) => discount.articles, { eager: true })
  discount: Discount;
}
