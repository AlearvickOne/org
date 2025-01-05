import { Controller, Get, Res } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('get-all-users')
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }
}
