import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersEntity } from '../database/entitys/users.entity';
import { NextFunction } from 'express';
import { dataSource } from '../../../../../data-source';

@Injectable()
export class UserService {
  async register(data: any) {
    const { email, password } = data;
    const hashPass = await argon2.hash(password, { type: argon2.argon2id });

    const token = await argon2.hash(email + Date.now().toString());

    const user = new UsersEntity();
    user.email = email;
    user.password = hashPass;
    user.token = token;
    await user.save();
  }

  async login(data: any, next: NextFunction) {
    const { email, password } = data;
    const user = await dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('user')
      .where('user.email = :Email', { Email: email }) // Добавлен двоеточие (:)
      .addSelect(['user.password', 'user.token']) // Указываем путь к полям
      .getOne();

    if (!user) {
      console.log('Пользователя нет');
      return;
    }

    const verifyPass = await argon2.verify(user.password, password);

    if (verifyPass) {
      return { id: user.id, token: user.token };
    }

    console.log(new Error('Пароль не верный'));
    return;
  }

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
