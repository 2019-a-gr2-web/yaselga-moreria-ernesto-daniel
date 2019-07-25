import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Client } from 'socket.io';
import { domainToASCII } from 'url';

@WebSocketGateway(3001, {
  namespace: '/TriviaStarWars'
})
export class TriviaGateway {
  @WebSocketServer() server;
  constructor() {
    console.log('Servidor de Trivia:', this.server);
  }
  @SubscribeMessage('start')
  start(client: Client | any, data: any) {
    console.log('ha llegado el padawan ' + data.nombre);
    const confirmacion = verificarRespuesta(data.numpregunta,data.respuesta);
    const rdata = siguientePregunta(data.numpregunta);
    console.log("rdata: ", rdata);
    client.emit('respuesta', confirmacion);
    client.emit('pregunta', rdata);
    console.log("pregunta enviada");
    return 'Pregunta ' +rdata.numpregunta+ ' Enviada al padawan: ' + data.nombre;
  }

}

function siguientePregunta(numPreguntaAnterior: string) {
  var data;
  console.log('# de pregunta recibida:',numPreguntaAnterior,'');
  if(numPreguntaAnterior === "0"){
    data = {
      pregunta: "Hello there", //general kenobi
      numpregunta: "1"
    }
  } else if(numPreguntaAnterior === "1"){
    data = {
      pregunta: "Do yo ever hear the tragedy of...", //darth plagueis
      numpregunta: "2"
    }
  } else if(numPreguntaAnterior === "2"){
    data = {
      pregunta: "Unlimited", //power
      numpregunta: "3"
    }
  } else if(numPreguntaAnterior === "3"){
    data = {
      pregunta: "You become the very thing you swore to", //destroy
      numpregunta: "4"
    }
    
  } else if(numPreguntaAnterior === "4"){
    data = {
      pregunta: "Execute order...", //66
      numpregunta: "5"
    }
    
  } else{
    data = {
      pregunta: "may the force be with you", //destroy
      numpregunta: "0"
    }
  }
  return data;
}

function verificarRespuesta(numPreguntaAnterior: string, respuesta: string){
  var confirmacion;
  console.log('# de pregunta recibida:',numPreguntaAnterior,'');
  
  if(numPreguntaAnterior === "0"){
    confirmacion=true;
  } else if(numPreguntaAnterior === "1"){
    if(respuesta === "general kenobi"){
      confirmacion = true;
    }
  } else if(numPreguntaAnterior === "2"){
    if(respuesta === "darth plagueis"){
      confirmacion = true;
    }
  } else if(numPreguntaAnterior === "3"){
    if(respuesta === "power"){
      confirmacion = true;
    }
  } else if(numPreguntaAnterior === "4"){
    if(respuesta === "destroy"){
      confirmacion = true;
    }
  } else if(numPreguntaAnterior === "5"){
    if(respuesta === "66"){
      confirmacion = true;
    }
  } else{
    if(respuesta === "general kenobi"){
      confirmacion = true;
    }
  }
  return confirmacion;

}
