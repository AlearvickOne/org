import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { defaultUser } from '../../../../types/models/users.model';
import { AuthService } from '../app/auth/auth.service';
import { inject } from 'inversify';
import { TYPES } from '../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    const user = await this.authService.getUserByToken(token);

    if (user) {
      req.user = user;
    } else {
      req.user = defaultUser;
    }
    next();
  }
}
