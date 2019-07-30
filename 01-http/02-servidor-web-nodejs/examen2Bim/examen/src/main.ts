import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
const cookieParser = require('cookie-parser');
//import * as session from 'express-session';
var session = require('express-session');
const FileStore = require('session-file-store')(session); // Nodejs

async function bootstrap() {
  const app = await NestFactory.create(AppModule)  as NestExpressApplication;

  app.use(session({
    name:'server-session-id',
    secret:'espero terminar antes del martes',
    resave:false,
    saveUninitialized:true,
    cookie: {
      secure: false
    },
    store: new FileStore()
  }));

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  app.use(cookieParser('Secreto'));
  await app.listen(3000);
}
bootstrap();
