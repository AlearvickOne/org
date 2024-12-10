import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';

@Injectable()
export class UserService {
  async getUserByToken(token: string) {
    if (!token) {
      return null;
    }

    return await UsersEntity.findOneBy({ token: token });
  }

  async getMyUser(id: number) {
    return UsersEntity.findOneBy({ id: id });
  }
}
