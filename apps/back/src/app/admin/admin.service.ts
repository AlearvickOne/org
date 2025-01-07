import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';
import { UsersModel } from '../../../../../types/models/users.model';
import { StringSharesNodeLib } from '../../../../../libs/common-node/src';

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

  // TODO ЗАМЕНИТЬ РОЛИ
  async saveUser(user: UsersModel) {
    const u = await UsersEntity.findOneBy({ id: user.id });

    if (!u) {
      return await this.createUser(user);
    }

    u.email = user.email;
    u.name = user.name;
    u.surname = user.surname;
    u.nickname = user.nickname;
    u.role = user.role ?? 1;

    if (user.password) {
      u.password = await StringSharesNodeLib.toHashArgon2(user.password);
    }

    await u.save();
    return u.id;
  }

  private async createUser(user: UsersModel) {
    const newUser = new UsersEntity();

    newUser.email = user.email;
    newUser.name = user.name;
    newUser.surname = user.surname;
    newUser.nickname = user.nickname;
    newUser.role = user.role ?? 1;

    newUser.password =
      user.password ??
      (await StringSharesNodeLib.toHashArgon2(Math.random().toString()));

    newUser.token = await StringSharesNodeLib.toHashArgon2(
      newUser.email + new Date().toLocaleString()
    );

    await newUser.save();
    return newUser.id;
  }
}
