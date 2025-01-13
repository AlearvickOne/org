import { Controller, Get, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { httpError } from '../../common/errors';

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

  @Put('save-user')
  async saveUser(@Req() req: Request) {
    const user = req.body;

    if (!user) {
      throw httpError('Пользователь для сохранения не получен');
    }

    return await this.userService.saveUser(user);
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
}
