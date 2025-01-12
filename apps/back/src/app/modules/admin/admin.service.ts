import { Injectable } from '@nestjs/common';
import { RolesEnum, UsersModel } from '@org/types';
import { StringSharesNodeLib } from '../../../../../../libs/common-node/src';
import { RolesEntity, UsersEntity } from '../../database/entities';
import { BlogsEntity } from '../../database/entities/blogs.entity';

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
    u.role = user.role ?? RolesEnum.user;

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
    newUser.role = user.role ?? RolesEnum.user;

    newUser.password =
      user.password ??
      (await StringSharesNodeLib.toHashArgon2(Math.random().toString()));

    newUser.token = await StringSharesNodeLib.toHashArgon2(
      newUser.email + new Date().toLocaleString()
    );

    await newUser.save();
    return newUser.id;
  }

  async getRoles() {
    return await RolesEntity.find();
  }

  async userArchived(userId: number, isArchived: boolean) {
    return await UsersEntity.update(
      { id: userId },
      { is_archived: isArchived }
    );
  }

  async deleteUser(userId: number) {
    return await UsersEntity.delete({ id: userId });
  }

  async saveContentBlog(userId: number, data: any) {
    const newBlog = new BlogsEntity();

    newBlog.user_id = userId;
    newBlog.content = data.content;

    await newBlog.save();
  }

  async getContentBlog(id: number) {
    return await BlogsEntity.findOneBy({ id: id });
  }

  async getBlogs() {
    return await BlogsEntity.find();
  }
}
