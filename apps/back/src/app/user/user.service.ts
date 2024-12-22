import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';
import { UsersModel } from '../../../../../types/models/users.model';
import { StringSharesNodeLib } from '../../../../../libs/common-node/src';

@Injectable()
export class UserService {
  async getMyUser(id: number) {
    return UsersEntity.findOneBy({ id: id });
  }

  async saveUser(user: UsersModel) {
    let foundUser = await UsersEntity.findOneBy({ id: user.id });

    foundUser.name = user.name;
    foundUser.surname = user.surname;

    if (user.password) {
      foundUser.password = await StringSharesNodeLib.toHashArgon2(
        user.password
      );
    }

    return await foundUser.save();
  }
}
