import {Body, Controller, Get, Post, Req, Res, Session} from "@nestjs/common";
import { PedidoService } from "../Pedido/pedido.service";


@Controller('api/despacho')
export class DespachoController {
    constructor(private readonly _pedidoService:PedidoService){

    }

    @Get('lista-pedidos')
    async consultarPedidos(
        @Res() res,
        @Req() req,
        @Session() session
    ){
        const listaPedidos= await this._pedidoService.listarPedidosDespacho();
        res.render('Despachador/menu.ejs',{
            usuario:session.username,
            listaPedidos:listaPedidos
        })
    }

    @Post('despachar-pedido')
    async despacharPedido(
        @Body() body,
        @Res () res,
        @Req () req
    ){
        try{

            const respuestaDespachado= await this._pedidoService.editarEstado(body.pedidoId,3);
            res.redirect('/api/despacho/lista-pedidos');
        }catch (e) {
            console.log(e);
        }


    }

}