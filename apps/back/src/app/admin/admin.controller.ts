import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from './admin.service';

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
  async saveUser(@Req() req: Request) {
    const user = req.body;

    return await this.adminService.saveUser(user);
  }
}
