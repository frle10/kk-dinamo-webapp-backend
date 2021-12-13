import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PlayerType } from './player.type.enum';
import { PlayerPosition } from './player.position.enum';
import { Image } from '../images/image.entity';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('date', { nullable: true })
  dateOfBirth: Date;

  @Column()
  type: PlayerType;

  @Column()
  position: PlayerPosition;

  @ManyToMany(() => Image, { cascade: true })
  @JoinTable()
  thumbnailImages: Image[];
}
