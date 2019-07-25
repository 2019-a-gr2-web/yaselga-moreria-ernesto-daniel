import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Client } from 'socket.io';
import { domainToASCII } from 'url';

@WebSocketGateway(3001, {
    namespace: '/websockets'
})
export class ChatGateway {
    @WebSocketServer() server;
    constructor() {
        console.log('Servidor chat:', this.server);
    }
    @SubscribeMessage('holaMundo')
    holaMundo(client: Client | any, data: any) {
        console.log(data);
        console.log('Nos hacen la peticion');
        //console.log('Servidor chat:', this.server);
        client.broadcast.emit('saludaron', data);
        return 'Hola ' + data.nombre;
    }

}