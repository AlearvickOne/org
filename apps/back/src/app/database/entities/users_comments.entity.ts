import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UsersCommentsModel } from '@org/types';

@Entity('users_comments')
export class UsersCommentsEntity
  extends BaseEntity
  implements UsersCommentsModel
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blog_id: number;

  @Column()
  body: string;

  @Column()
  created_at: string;
}
