import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from './admin.service';
import { RegistrationFromAdminDto } from '../../common/dto/registration-from-admin.dto';
import { httpError } from '../../common/errors';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('get-all-users')
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }

  @Get('get-user')
  async getUser(@Req() req: Request) {
    const userId = Number(req.query.id.toString());

    if (!userId) {
      return;
    }

    return await this.adminService.getUser(userId);
  }

  @Post('save-user')
  async saveUser(@Body() body: RegistrationFromAdminDto) {
    const user = body as any;

    if (!user) {
      throw httpError('Пользователь не получен');
    }

    return await this.adminService.saveUser(user);
  }

  @Get('get-roles')
  async getRoles() {
    return await this.adminService.getRoles();
  }

  @Post('user-archived')
  async userArchived(@Req() req: Request) {
    const userId = Number(req.query.id.toString());
    const isArchived = Boolean(req.body.isArchived);

    if (!userId) {
      throw httpError('userId не получен');
    }

    return await this.adminService.userArchived(userId, isArchived);
  }

  @Delete('user-delete')
  async deleteUser(@Req() req: Request) {
    const userId = Number(req.query.id.toString());

    if (!userId) {
      throw httpError('userId не получен');
    }

    return await this.adminService.deleteUser(userId);
  }

  @Post('save-content-blog')
  async saveContentBlog(@Req() req: Request) {
    const userId = Number(req.user.id.toString());
    const data = req.body;

    if (!userId || !data) {
      throw httpError('userId или content не найдены');
    }

    return await this.adminService.saveContentBlog(userId, data);
  }

  @Get('get-blogs')
  async getBlogs() {
    return await this.adminService.getBlogs();
  }

  @Get('get-content-blog')
  async getContentBlog(@Req() req: Request) {
    const id = Number(req.query.id);

    if (!id) {
      throw httpError('id блога не получено');
    }

    return await this.adminService.getContentBlog(id);
  }

  @Delete('delete-blog')
  async deleteBlog(@Req() req: Request) {
    const id = Number(req.query.id);

    if (!id) {
      throw httpError('id блога не получено');
    }

    return await this.adminService.deleteBlog(id);
  }
}
