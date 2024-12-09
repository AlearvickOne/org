import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction } from 'express';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: { email: string; password: string }) {
    return await this.userService.register(data);
  }

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
    @Next() next: NextFunction,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request
  ) {
    const result = await this.userService.login(data, next);

    res.cookie('token', result.token, {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(Date.now() + 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
    });

    return await this.userService.getMyUser(req.user.id);
  }

  @Get('get-my-user')
  async getMyUser(@Req() req: Request) {
    return await this.userService.getMyUser(req.user.id);
  }
}
