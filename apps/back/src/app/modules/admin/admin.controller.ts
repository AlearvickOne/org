import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from './admin.service';
import { RegistrationFromAdminDto } from '../../common/dto/registration-from-admin.dto';
import { httpError } from '../../common/errors';
import { UploadedFile } from 'express-fileupload';
import { Roles } from '../../../common/decorators/roles';
import { RolesEnum } from '@org/types';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('get-all-users')
  @Roles(RolesEnum.admin)
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }

  @Get('get-user')
  @Roles(RolesEnum.admin)
  async getUser(@Req() req: Request) {
    const userId = Number(req.query.id.toString());

    if (!userId) {
      return;
    }

    return await this.adminService.getUser(userId);
  }

  @Post('save-user')
  @Roles(RolesEnum.admin)
  async saveUser(@Body() body: RegistrationFromAdminDto) {
    const user = body as any;

    if (!user) {
      throw httpError('Пользователь не получен');
    }

    return await this.adminService.saveUser(user);
  }

  @Get('get-roles')
  @Roles(RolesEnum.admin)
  async getRoles() {
    return await this.adminService.getRoles();
  }

  @Post('user-archived')
  @Roles(RolesEnum.admin)
  async userArchived(@Req() req: Request) {
    const userId = Number(req.query.id.toString());
    const isArchived = Boolean(req.body.isArchived);

    if (!userId) {
      throw httpError('userId не получен');
    }

    return await this.adminService.userArchived(userId, isArchived);
  }

  @Delete('user-delete')
  @Roles(RolesEnum.admin)
  async deleteUser(@Req() req: Request) {
    const userId = Number(req.query.id.toString());

    if (!userId) {
      throw httpError('userId не получен');
    }

    return await this.adminService.deleteUser(userId);
  }

  @Post('save-content-blog')
  @Roles(RolesEnum.admin, RolesEnum.creator)
  async saveContentBlog(@Req() req: Request) {
    const userId = Number(req.user.id.toString());
    const data = req.body?.data;
    const fileImage = req.files?.fileImage as UploadedFile;

    if (!userId || !data) {
      throw httpError('userId или content не найдены');
    }

    return await this.adminService.saveContentBlog(
      userId,
      JSON.parse(data),
      fileImage
    );
  }

  @Get('get-blogs')
  @Roles(RolesEnum.admin, RolesEnum.creator)
  async getBlogs(@Req() req: Request) {
    const user = req.user;
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.take) || 100;
    const searchBlogById = req.query.search_blog_by_id?.toString();
    const searchBlogByTitle = req.query.search_blog_by_title?.toString();

    return await this.adminService.getBlogs(
      user,
      page,
      take,
      searchBlogById,
      searchBlogByTitle
    );
  }

  @Roles(RolesEnum.admin, RolesEnum.creator)
  @Get('get-content-blog')
  async getContentBlog(@Req() req: Request) {
    const user = req.user;
    const id = Number(req.query.id);

    if (!id) {
      throw httpError('id блога не получено');
    }

    return await this.adminService.getContentBlog(user, id);
  }

  @Roles(RolesEnum.admin, RolesEnum.creator)
  @Delete('delete-blog')
  async deleteBlog(@Req() req: Request) {
    const id = Number(req.query.id);

    if (!id) {
      throw httpError('id блога не получено');
    }

    return await this.adminService.deleteBlog(id);
  }
}
