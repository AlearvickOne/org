import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersEntity } from '../database/entitys/users.entity';

@Injectable()
export class UserService {
  getMessage() {
    return 'Hello World!';
  }

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

  async getUserByToken(token: string) {
    return UsersEntity.findOneBy({ token: token });
  }
}
