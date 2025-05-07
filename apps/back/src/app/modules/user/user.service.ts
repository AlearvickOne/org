import { Inject, Injectable } from '@nestjs/common';
import { ALLOWED_TYPES_IMAGE_FILES, UsersModel } from '@org/types';
import { StringSharesNodeLib } from '@org/common-node';
import { UsersEntity } from '../../database/entities';
import { BlogsEntity } from '../../database/entities/blogs.entity';
import { UploadedFile } from 'express-fileupload';
import { FilesService } from '../../../services/files.service';
import { httpError } from '../../common/errors';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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
      if (!ALLOWED_TYPES_IMAGE_FILES.includes(avatar.mimetype)) {
        throw httpError('Неподдерживаемый формат файла');
      }

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

  private lastSearchTextBlog: string = '';
  async getBlogs(search: string, page: number, take: number) {
    const cacheKey = `get-blogs:search="${search}":page=${page}:take=${take}`;
    const cachedBlogs = await this.cacheManager.get(cacheKey);

    if (cachedBlogs) {
      return cachedBlogs;
    }

    const sql = BlogsEntity.createQueryBuilder('blogs');

    // Если поисковый текст изменился, сбрасываем страницу
    if (search !== this.lastSearchTextBlog) {
      page = 1;
      this.lastSearchTextBlog = search;
    }

    // Если search не пустой, добавляем условие
    if (search.trim()) {
      sql.andWhere('blogs.title LIKE :search', { search: `%${search}%` });
    }

    sql.skip((page - 1) * take);
    sql.take(take);
    sql.orderBy('blogs.created_at', 'DESC');

    const manyAndCount = await sql.getManyAndCount();
    const manyCountAndPage = [...manyAndCount, page];

    // Сохраняем в кэш
    await this.cacheManager.set(cacheKey, manyCountAndPage);

    return manyCountAndPage;
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
