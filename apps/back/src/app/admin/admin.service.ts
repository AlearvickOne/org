import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';

@Injectable()
export class AdminService {
  constructor() {}

  async getAllUsers() {
    const users = await UsersEntity.createQueryBuilder('users')
      .addSelect(['users.email'])
      .getMany();

    console.log(users);

    return users;
  }
}
