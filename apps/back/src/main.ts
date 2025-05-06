/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import process from 'process';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import express from 'express';
import fs from 'node:fs';
import cookieParser from 'cookie-parser';
import { ParseAndValidatePipe } from './common/custom';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  await microservices(app);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.BACK_PORT || 3000;
  app.enableCors({
    origin: [
      `https://${process.env.DOMAIN}:${process.env.FRONT_PORT}`,
      `http://localhost:${process.env.FRONT_PORT}`,
    ],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(fileUpload());

  const publicFolder = await fs.promises.realpath(
    __dirname + '/../../../public'
  );
  app.use('/public', express.static(publicFolder));

  app.useGlobalPipes(new ParseAndValidatePipe());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap().then();

async function microservices(app: INestApplication) {
  // REDIS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.DOMAIN,
      port: 6379,
      retryAttempts: 5,
      retryDelay: 3000,
      wildcards: true,
    },
  });

  await app.startAllMicroservices();
}
