/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import process from 'process';
import fileUpload from 'express-fileupload';
import express from 'express';
import fs from 'node:fs';
import cookieParser from 'cookie-parser';

const validationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (validationErrors: ValidationError[]) => {
    // Формируем объект ошибок с именами полей
    const errors = validationErrors.reduce((acc, error) => {
      acc[error.property] = Object.values(error.constraints || {});
      return acc;
    }, {});
    return new BadRequestException(errors);
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.BACK_PORT || 3000;
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  app.use(cookieParser());
  app.use(fileUpload());

  const publicFolder = await fs.promises.realpath(
    __dirname + '/../../../public'
  );
  app.use('/public', express.static(publicFolder));

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap().then();
