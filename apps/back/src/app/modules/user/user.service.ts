import { Injectable } from '@nestjs/common';
import { UsersModel } from '@org/types';
import { StringSharesNodeLib } from '../../../../../../libs/common-node/src';
import { UsersEntity } from '../../database/entities';
import { BlogsEntity } from '../../database/entities/blogs.entity';
import { UploadedFile } from 'express-fileupload';
import { FilesService } from '../../../services/files.service';
import { Like } from 'typeorm';

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

  async saveUser(user: UsersModel, avatar: UploadedFile) {
    let foundUser = await UsersEntity.findOneBy({ id: user.id });

    foundUser.name = user.name;
    foundUser.surname = user.surname;
    foundUser.nickname = user.nickname;
    foundUser.email = user.email;

    if (avatar) {
      const ext = avatar.name.split('.').pop();
      const uid = user.id + '_uid-' + Math.random().toFixed(5);
      foundUser.avatar = await FilesService.mvAvatarUser(avatar, uid, ext);
    }

    if (user.password) {
      foundUser.password = await StringSharesNodeLib.toHashArgon2(
        user.password
      );
    }

    return await foundUser.save();
  }

  async getBlogs(search: string, page: number, take: number) {
    const sql = BlogsEntity.createQueryBuilder('blogs');

    if (search) {
      sql.andWhere({ title: Like(`%${search}%`) });
    }

    sql.skip((page - 1) * take);
    sql.take(take);
    sql.orderBy('blogs.created_at', 'DESC');

    return await sql.getManyAndCount();
  }

  async getBlog(id: number) {
    return await BlogsEntity.createQueryBuilder('blogs')
      .where('blogs.id = :Id', { Id: id })
      .leftJoinAndSelect('blogs.user', 'user')
      .getOne();
  }

  async getRandomBlogs() {
    return await BlogsEntity.createQueryBuilder('blogs')
      .orderBy('RAND()')
      .limit(10)
      .getMany();
  }
}
