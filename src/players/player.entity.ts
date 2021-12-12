import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Image, { eager: true })
  @JoinColumn()
  thumbnailImageId: number;
}
