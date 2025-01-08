import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UsersModel } from '@org/types';

@Entity('users')
export class UsersEntity extends BaseEntity implements UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  nickname: string;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  token: string;

  @Column()
  is_archived: boolean;

  @Column()
  created_at: string;
}
