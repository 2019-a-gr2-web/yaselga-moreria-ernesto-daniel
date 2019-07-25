import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TragosModule } from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TragosEntity } from "./tragos/tragos.entity";
import { DistribuidorModule } from './fiesta/fiesta.module';
import { FiestaModule } from './distribuidor/distribuidor.module';
import { DistribuidorEntity } from './distribuidor/distribuidor.entity';
import { FiestaEntity } from './fiesta/fiesta.entity';
import { ChatGateway } from './chat/chat.gateway';
import { TriviaGateway } from './trivia/trivia.gateway';


@Module({
  imports: [
    ChatGateway,
    TriviaGateway
    //TragosModule,
    //DistribuidorModule,
    //FiestaModule,
    /*TypeOrmModule.forRoot({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 32769,
    username: 'root',
    password: 'root',
    database: 'prueba',
    entities: [
      TragosEntity,
      DistribuidorEntity,
      FiestaEntity],
    synchronize: true,
    insecureAuth : true
}),*/
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
