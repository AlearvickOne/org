import { HttpException } from '@nestjs/common';

export const httpError = (message: string) => {
  throw new HttpException(message, 401);
};
