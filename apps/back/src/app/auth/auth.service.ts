import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersEntity } from '../database/entitys/users.entity';
import { Response, NextFunction } from 'express';
import { dataSource } from '../../../../../data-source';
import { RegistrationDto } from '../common/dto/registration.dto';

@Injectable()
export class AuthService {
  private TOKEN_NAME = 'token';

  constructor() {}

  async register(data: RegistrationDto) {
    const { password, ...u } = data;

    const hashPass = await argon2.hash(password, { type: argon2.argon2id });

    const token = await argon2.hash(u.email + Date.now().toString());

    const user = new UsersEntity();
    user.name = u.name;
    user.surname = u.surname;
    user.role = 1;
    user.phone = u.phone;
    user.email = u.email;
    user.password = hashPass;
    user.token = token;
    await user.save();
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('user')
      .where('user.email = :Email', { Email: email }) // Добавлен двоеточие (:)
      .addSelect(['user.password', 'user.token']) // Указываем путь к полям
      .getOne();

    if (!user) {
      return null;
    }

    const verifyPass = await argon2.verify(user.password, password);

    if (verifyPass) {
      return user.token;
    }

    return null;
  }

  async saveTokenInCookie(res: Response, token: string) {
    return res.cookie(this.TOKEN_NAME, token, {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(Date.now() + 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
    });
  }

  async removeTokenFromCookie(res: Response) {
    return res.cookie(this.TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
