import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';
import * as favicon from 'serve-favicon';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(cookieParser('Esta no la adivinas'));
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  await app.listen(3000);
}
bootstrap();
