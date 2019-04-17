import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookie from 'cookie-parser'; //<-- forma typescript
var cookieParser = require('cookie-parser'); //<-- forma javascript

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
