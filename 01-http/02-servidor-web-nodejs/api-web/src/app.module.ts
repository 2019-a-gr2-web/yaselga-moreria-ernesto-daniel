import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TragosModule } from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TragosEntity } from "./tragos/tragos.entity";

@Module({
  imports: [TragosModule,TypeOrmModule.forRoot({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 32773,
    username: 'root',
    password: 'root',
    database: 'prueba',
    entities: [TragosEntity],
    synchronize: true,
    insecureAuth : true
}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
