import { UsersModel } from '../../types/models/users.model';

declare global {
  namespace Express {
    interface Request {
      user: UsersModel;
    }
  }
}
