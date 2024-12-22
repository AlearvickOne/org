import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../database/entitys/users.entity';
import { Response } from 'express';
import { dataSource } from '../../../../../data-source';
import { RegistrationDto } from '../common/dto/registration.dto';
import { inject } from 'inversify';
import { TYPES } from '../../types';
import { ConfigService } from '../../services/config.service';
import { StringSharesNodeLib } from '../../../../../libs/common-node/src';

@Injectable()
export class AuthService {
  private readonly TOKEN_NAME: string;

  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigService
  ) {
    this.TOKEN_NAME = this.configService.get('TOKEN_NAME');
  }

  async getUserByToken(token: string) {
    if (!token) {
      return null;
    }

    const decodeToken = await StringSharesNodeLib.toDecodeBase64(token);

    return await UsersEntity.findOneBy({
      token: decodeToken,
    });
  }

  async register(data: RegistrationDto) {
    const { password, ...u } = data;

    const hashPass = await StringSharesNodeLib.toHashArgon2(password);
    const newToken = await StringSharesNodeLib.toHashArgon2(
      u.email + new Date().toLocaleString()
    );

    const user = new UsersEntity();
    user.name = u.name;
    user.surname = u.surname;
    user.nickname = u.nickname;
    user.role = 1;
    user.email = u.email;
    user.password = hashPass;
    user.token = newToken;
    await user.save();
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await UsersEntity.createQueryBuilder('user')
      .where('user.email = :Email', { Email: email })
      .addSelect(['user.password', 'user.token'])
      .getOne();

    if (!user) {
      return null;
    }

    const verifyPass = await StringSharesNodeLib.verifyHashArgon2(
      user.password,
      password
    );

    if (verifyPass) {
      return await StringSharesNodeLib.toEncodeBase64(user.token);
    }

    return null;
  }

  async saveTokenInCookie(res: Response, token: string) {
    return res.cookie(this.TOKEN_NAME, token, {
      httpOnly: true,
      domain: 'localhost',
      maxAge: 100_000 * 100_000,
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
