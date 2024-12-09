import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../app/user/user.service';
import { defaultUser } from '../../../../types/models/users.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    const user = await this.userService.getUserByToken(token);

    if (user) {
      req.user = user;
    } else {
      req.user = defaultUser;
    }
    next();
  }
}
