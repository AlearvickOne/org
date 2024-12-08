import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UsersModel } from '../../../../../../types/models/users.model';

@Entity('users')
export class UsersEntity extends BaseEntity implements UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  token: string;

  @Column()
  created_at: string;
}
