import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filepath: string;

  @Column()
  filename: string;

  @Column({ default: '' })
  altText: string;
}
