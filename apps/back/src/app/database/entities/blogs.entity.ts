import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BlogsModel } from '@org/types';

@Entity('blogs')
export class BlogsEntity extends BaseEntity implements BlogsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @Column()
  content: string;

  @Column()
  created_at?: string;
}
