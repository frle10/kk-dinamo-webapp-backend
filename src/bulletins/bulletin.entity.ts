import { Image } from 'src/images/image.entity';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { BulletinType } from './bulletin.type.enum';

@Entity()
export class Bulletin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: BulletinType;

  @Column('date')
  createdOn: Date;

  @Column('date')
  lastModifiedOn: Date;

  @ManyToMany(() => Image, { cascade: true })
  images: Image[];
}
