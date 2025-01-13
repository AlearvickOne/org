import { Injectable } from '@nestjs/common';
import { UsersModel } from '@org/types';
import { StringSharesNodeLib } from '../../../../../../libs/common-node/src';
import { UsersEntity } from '../../database/entities';
import { BlogsEntity } from '../../database/entities/blogs.entity';

@Injectable()
export class UserService {
  async getMyUser(id: number) {
    return UsersEntity.findOneBy({ id: id });
  }

  async getMyUserAndEmail(id: number) {
    return await UsersEntity.createQueryBuilder('user')
      .where('user.id = :userId', {
        userId: id,
      })
      .addSelect('user.email')
      .getOne();
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

  async getBlogs() {
    return await BlogsEntity.find();
  }

  async getBlog(id: number) {
    return await BlogsEntity.findOneBy({ id: id });
  }
}
