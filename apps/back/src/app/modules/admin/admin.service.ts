import { Injectable } from '@nestjs/common';
import { RolesEnum, UsersModel, ALLOWED_TYPES_IMAGE_FILES } from '@org/types';
import { StringSharesNodeLib } from '../../../../../../libs/common-node/src';
import { RolesEntity, UsersEntity } from '../../database/entities';
import { BlogsEntity } from '../../database/entities/blogs.entity';
import { FilesService } from '../../../services/files.service';
import { UploadedFile } from 'express-fileupload';
import { Like } from 'typeorm';
import { httpError } from '../../common/errors';

@Injectable()
export class AdminService {
  constructor() {}

  async getAllUsers(
    searchUserById: string,
    searchUserByEmail: string,
    searchUserByNickname: string,
    page: number,
    take: number
  ) {
    const sql = UsersEntity.createQueryBuilder('users');
    sql.addSelect(['users.email']);

    if (searchUserById) {
      sql.andWhere({ id: searchUserById });
      page = 1;
    }

    if (searchUserByEmail) {
      sql.andWhere({ email: Like(`%${searchUserByEmail}%`) });
      page = 1;
    }

    if (searchUserByNickname) {
      sql.andWhere({ nickname: Like(`%${searchUserByNickname}%`) });
      page = 1;
    }

    sql.skip((page - 1) * take);
    sql.take(take);

    return await sql.getManyAndCount();
  }

  async getUser(id: number) {
    return await UsersEntity.createQueryBuilder('users')
      .where('id = :Id', { Id: id })
      .addSelect(['users.email'])
      .getOne();
  }

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

  async saveContentBlog(
    userId: number,
    data: any,
    fileImage: UploadedFile | null
  ) {
    const newBlog =
      (await BlogsEntity.findOneBy({ id: data.id })) ?? new BlogsEntity();

    if (fileImage) {
      if (!ALLOWED_TYPES_IMAGE_FILES.includes(fileImage.mimetype)) {
        throw httpError('Неподдерживаемый формат файла');
      }

      const blogUid = data.id + '_uid-' + Math.random().toFixed(5);
      const ext = fileImage.name.split('.').pop();
      newBlog.photo = await FilesService.mvBlogImgSave(fileImage, blogUid, ext);
    }

    newBlog.user_id = userId;
    newBlog.title = data.title;
    newBlog.description = data.description;
    newBlog.content = data.content;

    await newBlog.save();
    return newBlog.id;
  }

  async getContentBlog(user: UsersModel, id: number) {
    if (user.role !== RolesEnum.admin) {
      return await BlogsEntity.findOneBy({ id: id, user_id: user.id });
    }

    return await BlogsEntity.findOneBy({ id: id });
  }

  async getBlogs(
    user: UsersModel,
    page: number,
    take: number,
    searchBlogById: string,
    searchBlogByTitle: string
  ) {
    const sql = BlogsEntity.createQueryBuilder('blogs');

    if (user.role !== RolesEnum.admin) {
      sql.andWhere({ user_id: user.id });
    }

    if (searchBlogById) {
      sql.andWhere({ id: searchBlogById });
      page = 1;
    }

    if (searchBlogByTitle) {
      sql.andWhere({ title: Like(`%${searchBlogByTitle}%`) });
      page = 1;
    }

    sql.skip((page - 1) * take);
    sql.take(take);

    return await sql.getManyAndCount();
  }

  async deleteBlog(id: number) {
    return await BlogsEntity.delete({ id: id });
  }
}
