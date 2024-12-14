import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';
import { AuthDto } from '../common/dto/auth.dto';
import { RegistrationDto } from '../common/dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegistrationDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(
    @Body() data: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(data);

    if (!token) {
      throw new HttpException('Не верный логин или пароль', 401);
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
