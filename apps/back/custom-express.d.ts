import { UsersEntity } from './src/app/database/entitys/users.entity';

declare global {
  namespace Express {
    interface Request {
      user: UsersEntity;
    }
  }
}
