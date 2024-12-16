import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';
import { UsersModel } from '../../../../../types/models/users.model';

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

  async saveUser(user: UsersModel) {
    let foundUser = await UsersEntity.findOneBy({ id: user.id });

    foundUser.name = user.name;
    foundUser.surname = user.surname;
    return await foundUser.save();
  }
}
