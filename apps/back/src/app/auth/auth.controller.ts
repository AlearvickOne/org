import {
  Body,
  Controller,
  Get,
  HttpException,
  Next,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';
import { AuthDto } from '../common/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: AuthDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(
    @Body() data: AuthDto,
    @Next() next: NextFunction,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(data);

    if (!token) {
      throw new HttpException('Логин или пароль не верные', 401);
    }

    await this.authService.saveTokenInCookie(res, token);
    return true;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.removeTokenFromCookie(res);
    return true;
  }
}
