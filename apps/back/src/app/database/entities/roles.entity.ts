import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesModel } from '@org/types/models';

@Entity('roles')
export class RolesEntity extends BaseEntity implements RolesModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  name: string;
}
