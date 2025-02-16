import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { httpError } from '../../common/errors';
import { UploadedFile } from 'express-fileupload';
import { UsersModel } from '@org/types';
import { EditAccountUserDto } from '../../common/dto/edit-account-user.dto';

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
  async saveUser(@Body() body: EditAccountUserDto, @Req() req: Request) {
    const avatar = req.files?.avatar as UploadedFile;
    const user = body;

    if (!user) {
      throw httpError('Пользователь для сохранения не получен');
    }

    return await this.userService.saveUser(user as UsersModel, avatar);
  }

  @Get('get-blogs')
  async getBlogs(@Req() req: Request) {
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.take) || 1;
    const search = req.query.search?.toString();

    return await this.userService.getBlogs(search, page, take);
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
