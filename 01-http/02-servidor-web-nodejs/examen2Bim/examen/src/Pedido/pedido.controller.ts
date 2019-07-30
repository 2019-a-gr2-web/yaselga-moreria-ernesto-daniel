import {Controller, Post, Body, Res, Session, Query, Req, Get} from "@nestjs/common";
import {LoginService} from "../Login/login.service";
import {PedidoService} from "./pedido.service";
import {UsuarioService} from "../Usuario/usuario.service";
import {DetalleService} from "../Detalle/detalle.service";

@Controller('api/pedido')
export class PedidoController {
    constructor(private readonly _pedidoService: PedidoService, private readonly _loginService: LoginService,
                private readonly _usuarioService:UsuarioService,private readonly _detalleService:DetalleService) {

    }

    @Post('crear-pedido')
    async postCrearPedido(
        @Body() body,
        @Res() res,
        @Session() session,
    ){
        const usuario=await this._usuarioService.buscarUsuarioPorNombre(body.usuarioNombre)
        //console.log(usuario.usuarioId);
        //const id=usuario.usuarioId;

        try {

            const respuestaCrear=await this._pedidoService.crearPedido(usuario.usuarioId,usuario.nombreUsuario,usuario.direccion,usuario.telefono,usuario.cedula);
            console.log(respuestaCrear.pedidoId);
            //return respuestaCrear.pedidoId;
            const pedido=respuestaCrear.pedidoId;
            res.redirect('/api/menu?pedido='+pedido);

        }catch (e) {
            console.log(e)
        }
    }

    @Post('crear-detalle/:pedido')
    async crearDetalle(
        @Query() query,
        @Body() body,
        @Res() res,
        @Req() req,
        @Session() session
    ){

        try {
            const respuestaDetalle=await this._detalleService.crearDetalle(req.params.pedido,body.productoId);
            const listaDetalle=await this._detalleService.listarDetalle(req.params.pedido);
            console.log(listaDetalle.length);
            const subTotal=listaDetalle.length;
            const total=subTotal*(0.12)+subTotal;
            const pedidoActualizado=await this._pedidoService.modificarPedido(req.params.pedido,subTotal,total);

            res.redirect('/api/menu?pedido='+req.params.pedido);

        }catch (e) {

        }
    }

    @Get('lista-pedido-usuario')
    async pedidoUsuario(
        @Res() res,
        @Req() req,
        @Query() query,
        @Session() session
    ){
        console.log(session.username);


        try {
            const usuario=await this._usuarioService.buscarUsuarioPorNombre(session.username);
            const listaPedidos=await this._pedidoService.listarPedidosUsuario(usuario.usuarioId);
            console.log(listaPedidos)
            res.render('Usuario/pedidos.ejs',{
                usuario:session.username,
                listaPedidos:listaPedidos,
            })
        }catch (e) {

        }
    }

    @Post('cambiar-estado')
    async confirmarPedido(
        @Body() body,
        @Session() session,
        @Res() res
    ){
        try{
            const respuestaEditado=await this._pedidoService.editarEstado(body.pedidoId,2);
            res.redirect('/api/pedido/lista-pedido-usuario');
        }catch (e) {
            console.log(e)
        }

    }

    @Post('cancelar')
    async cancelarPedido(
        @Body() body,
        @Session() session,
        @Res() res,
    ){
        try {
            const respuestaEditado=await this._pedidoService.editarEstado(body.pedidoId,0);
            res.redirect('/api/pedido/lista-pedido-usuario');
        }catch (e) {
            console.log(e)
        }

    }
}