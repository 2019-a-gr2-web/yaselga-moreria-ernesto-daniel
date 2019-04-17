import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Put,
    Headers,
    Query,
    Param,
    Body,
    Request,
    Response,
    Req
} from '@nestjs/common';
import { AppService } from './app.service';
import {response} from "express";
import {retry} from "rxjs/operators";

//http://172.0.0.1:3000/segmentoInicial/segmentoAccion
//@Controller(segmentoInicial)

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}
//@Get(SegmentoAccion)
  @Get('/hello-world') //Método HTTP
  getHello(): string {
    return "Hello world";
  }
  @Get('/adivina')
  adivina(@Headers() headers):string{ //<-- clase
    const numeroRandomico = Math.round(Math.random() * 10);
    const numeroDeCabecera = Number(headers.numero);
      console.log('Headers: ',headers);
    if(numeroDeCabecera == numeroRandomico){
      return 'OK';
    }else{
        return ':-(';
    }
      return "OK";
  }

  //?llave=valor&llave2=valor2
  @Get('/consultar')
  consultar(@Query() queryParams){
      console.log('Query Params',queryParams);
      if(queryParams.nombre){
          return `Hola ${queryParams.nombre} ${queryParams.apellido}`;
      }else{
          return 'Hola extraño';
      }
  }

  @Get('/ciudad/:idCiudad')ciudad(@Param() parametroDeRuta){
      switch (parametroDeRuta.idCiudad.toLowerCase()){
          case 'quito':
                return 'Que fueff';
          case 'guayaquil':
              return 'Que maah ñañoshh';
          default:
              return 'Buenas tardes';
      }
  }

    @Post('/ciudad/:idCiudad')ciudadPOST(@Param() parametroDeRuta) {
        switch (parametroDeRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que maah ñañoshh';
            default:
                return 'Buenas tardes';
        }
    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response,
    ){
      if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
          const cantidad = Number(parametrosCuerpo.cantidad);
          if (parametrosCuerpo.cantidad > 1) {
              response.set('Premio', 'Fanesca');
          }
          return response.send({mensaje: 'Registro Creado'});
      }else {
              return response.status(400).send({mensaje: 'Error, no envía nombre o cantidad',error: 400});
          }
    }

  @Get('/semilla')
  semilla(@Request() request){
      console.log(request.cookies);
      const cookies = request.cookies;
      if(cookies.micookie){
          return 'habemus cookie'
      }else{
          return '¡no hay cookie! D:'
      }
  }

  @Post('/hola-mundo') //Método HTTP
  postHello(){
    return "Hola mundo en post";
  }

  @Put('/privet-mir')
  putHello(){
    return "привет мир"
  }

  @Delete('/Ola-mundo')
  deleteHello()
  {
    return"Ola mundo"
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
--------
  Variables: puede tiparse o no
  var nombre:string = 'nombre'; //string
  var apellido = 'nombre'; //string
  var edad = 29; //number
  var sueldo = 1.20; //number
  var casado = false; //boolean
  var hijos = null; // null
  var alas undefinde; // undefined

  var nunca se usa, en su lugar se usa let
  let nombre:string = 'nombre'; //string
  let apellido = 'nombre'; //string
  let edad = 29; //number
  let sueldo = 1.20; //number
  let casado = false; //boolean
  let hijos = null; // null
  let alas undefinde; // undefined

  si una variable no va a cambiar se usa const
  const nombre:string = 'nombre'; //string
  const apellido = 'nombre'; //string
  const edad = 29; //number
  const sueldo = 1.20; //number
  const casado = false; //boolean
  const hijos = null; // null
  const alas undefinde; // undefined
-------

}*/
/*const json = [{
    "llave":"valor",
    "key":"value",
    "nombre":"Adrian",
    "edad":22,
    "sueldo": 10.21,
    "casado": false,
    "hijos": null,
    "mascotas": ["cachetas",
        1,
        1.02,
        false,
        null,
        {
            "nombre": "Ernesto"
        }
    ]
}];*/
/*
let objeto:any = {
    propiedad:'valor1',
    propiedadDos:'valor2',
};
/*
objeto.propiedad // --> devuelve valor1
objeto.propiedadDos // --> devuelve valor2

//Agregar propiedades a ub objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres']='valor3';
//borrar una propiedad
//forma peligrosa (NO ABUSAR)
delete objeto.propiedadTres;
//forma segura
objeto.propiedadTres = undefined;*/