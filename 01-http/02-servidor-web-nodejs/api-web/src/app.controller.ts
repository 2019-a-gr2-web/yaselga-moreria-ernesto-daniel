import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //Método HTTP
  getHello(): string {
    return this.appService.getHello();
  }
  @Post() //Método HTTP
  @HttpCode(200)
  postHello(){
    return "Hola mundo en post";
  }
}

/*class usuario{
  atributoPublico; //por defecto publico
  private atributoPrivado;
  protected atributoProtegido;
  constructor(atributoPublico, atributoPrivado, atriburoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = this.atributoPrivado;
    this.atributoProtegido = atriburoProtegido;
  }
  public metodoPublico(){}
  protected metodoProtegido(){}
  private metodoPrivado(){}

}*/