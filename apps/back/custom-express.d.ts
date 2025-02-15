import { UsersModel } from '@org/types';

declare global {
  namespace Express {
    interface Request {
      user: UsersModel;
      files?: fileUpload.FileArray | null | undefined;
    }
  }
}
