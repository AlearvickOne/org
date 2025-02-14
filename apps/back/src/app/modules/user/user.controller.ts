import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { httpError } from '../../common/errors';
import { FilesService } from '../../../services/files.service';
import { UploadedFile } from 'express-fileupload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-my-user')
  async getMyUser(@Req() req: Request) {
    return await this.userService.getMyUser(req.user.id);
  }

  @Get('get-my-user-and-email')
  async getMyUserAndEmail(@Req() req: Request) {
    return await this.userService.getMyUserAndEmail(req.user.id);
  }

  @Post('save-user')
  async saveUser(@Req() req: Request) {
    const avatar = req.files?.avatar as UploadedFile;
    const user = req.body?.data;

    if (!user) {
      throw httpError('Пользователь для сохранения не получен');
    }

    return await this.userService.saveUser(JSON.parse(user), avatar);
  }

  @Get('get-blogs')
  async getBlogs() {
    return await this.userService.getBlogs();
  }

  @Get('get-blog')
  async getBlog(@Req() req: Request) {
    const id = Number(req.query.id);

    if (!id) {
      throw httpError('id блога не получено');
    }

    return await this.userService.getBlog(id);
  }

  @Get('get-random-blogs')
  async getRandomBlogs() {
    return await this.userService.getRandomBlogs();
  }
}
