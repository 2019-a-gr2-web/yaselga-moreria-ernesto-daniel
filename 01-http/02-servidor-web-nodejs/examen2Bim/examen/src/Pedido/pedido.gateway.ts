// ws://localhost:3001/websockets
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";

@WebSocketGateway(3001,{
    namespace:'/websockets'
})
export class PedidoGateway {

    @WebSocketServer() server;
    constructor(){
        console.log(this.server)
    }

    @SubscribeMessage('despachar')
    despachar(client:Client | any,data:any){
        client.broadcast.emit('despachado',data);
        return data.nombre;
    }


}