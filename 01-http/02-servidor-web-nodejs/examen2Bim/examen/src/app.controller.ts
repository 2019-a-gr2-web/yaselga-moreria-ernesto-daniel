import { Controller, Get, Res, Req, Session, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductosService } from './Hijo/hijo.service';
import { LoginService } from './Login/login.service';
import { PedidoService } from './Pedido/pedido.service';
import { UsuarioService } from './Usuario/usuario.service';
import { TiendaService } from './Padre/padre.service';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _tiendaService: TiendaService,
    private readonly _loginService: LoginService,
    private readonly _productoService: ProductosService,
    private readonly _usuarioService: UsuarioService,
    private readonly _pedidoService: PedidoService,
  ) { }


  @Get()
  inicio(
    @Res() res,
    @Req() req,
    @Session() session
  ) {
    res.redirect('/api/login')
  }

  @Get('login')
  login(
    @Res() res,
    @Req() req,
    @Session() session
  ) {
    if (session.usuario) {
      session.usuario.destroy();
    }

    res.cookie(
      'tipoRol', 0, {
        signed: true
      }).render('login.ejs');
  }

  @Post('ingresar')
  ingresar(
    @Body() body,
    @Res() res
  ) {
    console.log(body.tipoRol);
    res.cookie(
      'usuario',
      body.usuario,
      {
        signed: true
      }
    ).cookie(
      'tipoRol',
      body.tipoRol, {
        signed: true
      }
    ).redirect('/api/menu');
  }

  @Get('menu')
  async menu(
    @Res() res,
    @Req() req,
    @Session() session,
    @Query() query
  ) {
    //if(this._loginService.validarCookies(req,res)){
    const rol = Number(req.signedCookies.tipoRol);
    switch (rol) {
      case 1: {
        try {
          const listaTiendas = await this._tiendaService.findAll();
          console.log(listaTiendas);
          res.render('Administrador/menuAdministrador.ejs', {
            usuario: session.username,
            tipoRol: req.signedCookies.tipoRol,
            listaTiendas: listaTiendas
          });
        }
        catch (e) {
          console.error(e)
        }
        break;
      }
      case 2: {
        try {
          const listaTiendas = await this._tiendaService.findAll();

          let listaProductos;
          if (req.query.tienda) {
            listaProductos = await this._productoService.listaProductos(req.query.tienda);
          } else {
            listaProductos = await this._productoService.listarTodo();
          }

          let pedido = 0;
          if (req.query.pedido) {
            pedido = req.query.pedido;
          }

          let tienda = 0;
          if (req.query.tienda) {
            tienda = req.query.tienda
          }
          res.render('Usuario/menu.ejs', {
            usuario: session.username,
            tipoRol: req.signedCookies.tipoRol,
            listaTiendas: listaTiendas,
            listaProductos: listaProductos,
            idPedido: pedido,
            idTienda: tienda
          });
        }
        catch (e) {
          console.error(e)
        }
        break;
      }
      case 3: {
        try {
          const listaPedidos = await this._pedidoService.listarPedidosDespacho();
          res.render('Despachador/menu.ejs', {
            usuario: session.username,
            tipoRol: req.signedCookies.tipoRol,
            listaPedidos: listaPedidos
          });
        }
        catch (e) {
          console.error(e)
        }
        break;
      }
      default: {
        res.redirect('/api/login');
      }
    }
  }

  @Get('gestionProductos')
  gestionProductos(
    @Res() res,
    @Session() session
  ) {
    res.render('Administrador/gestionProductos.ejs')
  }

  @Post('autenticar')
  async postAutenticar(
    @Body() body,
    @Session() session,
    @Res() res
  ) {
    try {
      const respuestaUsuario = await this._usuarioService
        .buscarUsuario(body.usuario, body.password, body.tipoRol);
      console.log(respuestaUsuario);
      if (respuestaUsuario.length > 0) {
        session.username = body.usuario;
        res.cookie(
          'tipoRol',
          body.tipoRol, {
            signed: true
          }
        ).redirect('/api/menu')

      } else {
        console.log("datos incorrecto");
        res.redirect('/api/login');
      }
    } catch (e) {
      console.log(e)
    }

  }

}
