import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogsModel } from '@org/types';
import { UsersEntity } from './users.entity';

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

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
