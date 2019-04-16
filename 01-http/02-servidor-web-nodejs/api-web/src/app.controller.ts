import {Controller, Delete, Get, HttpCode, Post, Put, Headers} from '@nestjs/common';
import { AppService } from './app.service';

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
    console.log('Headers: ',headers);
    const numeroRandomico = Math.round(Math.random() * 10);
    const numeroDeCabecera = Number(headers.numero);
    
    if(numeroDeCabecera == numeroRandomico){
      return 'OK';
    }else{
        return ':-(';
    }
      return "OK";
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

let objeto:any = {
    propiedad:'valor1',
    propiedadDos:'valor2',
};
objeto.propiedad // --> devuelve valor1
objeto.propiedadDos // --> devuelve valor2

//Agregar propiedades a ub objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres']='valor3';
//borrar una propiedad
//forma peligrosa (NO ABUSAR)
delete objeto.propiedadTres;
//forma segura
objeto.propiedadTres = undefined;