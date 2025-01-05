import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';

@Injectable()
export class AdminService {
  constructor() {}

  async getAllUsers() {
    return await UsersEntity.createQueryBuilder('users')
      .addSelect(['users.email'])
      .getMany();
  }

  async getUser(id: number) {
    return await UsersEntity.createQueryBuilder('users')
      .where('id = :Id', { Id: id })
      .addSelect(['users.email'])
      .getOne();
  }
}
