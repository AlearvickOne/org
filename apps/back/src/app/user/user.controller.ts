import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('message')
  getMessage() {
    return this.userService.getMessage();
  }

  @Post('register')
  async register(@Body() data: { email: string; password: string }) {
    return await this.userService.register(data);
  }
}
