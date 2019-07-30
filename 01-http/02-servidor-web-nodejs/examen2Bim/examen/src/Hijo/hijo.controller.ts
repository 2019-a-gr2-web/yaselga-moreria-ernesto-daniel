import { Controller, Get, Res, Req, Session, Body, Post, Query } from "@nestjs/common";
import { ProductosService } from "./hijo.service";
import { LoginService } from "../Login/login.service";
import { ProductosCreateDto } from "./dto/hijo.create.dto";
import { ProductosUpdateDto } from "./dto/hijo.update.dto";
import { ProductoEntity } from "./hijo.entity";
import { validate } from "class-validator";

@Controller('api/tienda/gestion')
export class ProductoController {
    constructor(
        private readonly _productosService: ProductosService,
        private readonly _loginService: LoginService
    ) {

    }
    @Get(':idPadre')
    async gestionar(
        @Res() res,
        @Req() req,
        @Session() session
    ) {
        console.log(Number(req.params.idPadre));
        try {
            const listaProductos = await this._productosService.
                listaProductos(Number(req.params.idPadre));
            console.log(listaProductos);
            res.render('Administrador/gestionProductos.ejs', {
                usuario: session.username,
                    listaProductos: listaProductos,
                idPadre: Number(req.params.idPadre)
            });
        } catch (e) {
            console.error(e)
        }
    }
    @Get('crear/:idPadre')
    crear(
        @Res() res,
        @Req() req,
        @Query() query,
        @Session() session

    ) {
        //console.log("Ha llegado: ",query);
        const hoy = new Date();

        let fecha;
        //console.log(query.fechaLanzamiento)
        if (query.fechaLanzamiento == null) {
            fecha = hoy
        } else {
            fecha = new Date(query.fechaLanzamiento)
        }

        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();
        if (mes < 10) {
            mes = "0" + mes;
        };
        if (dia < 10) {
            dia = "0" + dia;
        }
        const fechaLanzamiento = fecha.getFullYear() + "-" + mes + "-" + dia;

        //console.log(fecha);
        //if(this._loginService.validarCookies(req,res)){
        res.render('Administrador/crear-editar.ejs', {
            //usuario:req.signedCookies.usuario,
            usuario: session.username,
            idPadre: req.params.idPadre,
            mensaje: query.mensaje,
            campos: query.campos,
            nombre: query.nombre,
            fechaLanzamiento: fechaLanzamiento,
            aniosGarantia: query.aniosGarantia,
            precio: query.precio,
            descripcion: query.descripcion
        });
        //}
    }

    @Post('crear/:idPadre')
    async crearPost(
        @Res() res,
        @Body() producto: ProductoEntity,
        @Req() req
    ) {
        console.log("ha llegado el producto:  ",producto);
        producto.TiendaId = req.params.idPadre;
        //producto.tiendaId = Number(producto.tiendaId);
        producto.precio = Number(producto.precio);
        producto.aniosGarantia = Number(producto.aniosGarantia);
        producto.fechaLanzamiento = producto.fechaLanzamiento ? new Date(producto.fechaLanzamiento) : undefined;

        console.log("transformado:  ",producto);
        
        //console.log(producto);
        let productoValidar = new ProductosCreateDto()

        productoValidar.nombre = producto.nombre;
        productoValidar.fechaLanzamiento = producto.fechaLanzamiento;
        productoValidar.aniosGarantia = producto.aniosGarantia;
        productoValidar.descripcion = producto.descripcion
        productoValidar.precio = producto.precio;
        productoValidar.TiendaId = producto.TiendaId;
        try {
            const errores = await validate(productoValidar);
            console.log("error: ",errores);
            if (errores.length > 0) {
                const valores = (<ProductosCreateDto>errores[0].target)

                const campos = []
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs = "&nombre=" + valores.nombre + "&fechaLanzamiento=" + valores.fechaLanzamiento + "&aniosGarantia=" + valores.aniosGarantia + "&precio=" + valores.precio + "&descripcion=" + valores.descripcion
                res.redirect('/api/tienda/gestion/crear/' + Number(req.params.idPadre) + "?mensaje=Complete los campos obligatorios " + inputs);
            } else {
                const respuestaCrear = await this._productosService.crear(producto);
                res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
            }


        } catch (e) {
            //console.error(e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }
    }

    @Post('eliminar/:idPadre')
    async eliminar(
        @Res() res,
        @Req() req,
        @Body('productoId') productoId: number
    ) {
        //console.log(productoId)

        try {
            const respuestaEliminar = await this._productosService.eliminarPorId(productoId);
            //console.log(respuestaEliminar);
            res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
        } catch (e) {
            console.error(e)
        }

    }
    
    @Post('editar/:idPadre')
    async editar(
        @Res() res,
        @Req() req,
        @Query() query,
        @Body('productoId') productoId: number,
        @Session() session
    ) {
        console.log(productoId)
        try {
            let mensaje = "";
            if(query.mensaje!=""){
                mensaje=query.mensaje;
            }
            //const respuestaEditar=await this._productosService.eliminarPorId(productoId);
            const producto = await this._productosService.buscarXid(productoId)
            console.log("InfoProductoExtraido",producto);
            res.render('Administrador/actualizar.ejs', {
                //usuario:req.signedCookies.usuario,
                producto: producto[0],
                usuario: session.username,
                idPadre: req.params.idPadre,
                mensaje: mensaje,
                //nombre: producto[0].nombre, 
            });
        } catch (e) {
            console.error(e)
        }
    }

    @Post('editarEnvio/:idPadre/:idHijo')
    async editarPost(
        @Res() res,
        @Body() producto: ProductoEntity,
        @Req() req
    ) {
        console.log("ha llegado el producto modificado:  ",producto);
        //producto.productoId = req.params.idHijo;
        producto.TiendaId = req.params.idPadre;
        
        producto.productoId = Number(producto.productoId); 

        //producto.tiendaId = Number(producto.tiendaId);
        producto.precio = Number(producto.precio);
        producto.aniosGarantia = Number(producto.aniosGarantia);
        producto.fechaLanzamiento = producto.fechaLanzamiento ? new Date(producto.fechaLanzamiento) : undefined;

        console.log("transformado:  ",producto);
        
        //console.log(producto);
        let productoValidar = new ProductosUpdateDto()

        productoValidar.nombre = producto.nombre;
        productoValidar.fechaLanzamiento = producto.fechaLanzamiento;
        productoValidar.aniosGarantia = producto.aniosGarantia;
        productoValidar.descripcion = producto.descripcion
        productoValidar.precio = producto.precio;
        productoValidar.TiendaId = producto.TiendaId;
        try {
            const errores = await validate(productoValidar);
            console.log("error: ",errores);
            if (errores.length > 0) {
                const valores = (<ProductosUpdateDto>errores[0].target)

                const campos = []
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs = "&nombre=" + valores.nombre + "&fechaLanzamiento=" + valores.fechaLanzamiento + "&aniosGarantia=" + valores.aniosGarantia + "&precio=" + valores.precio + "&descripcion=" + valores.descripcion
                res.redirect('/api/tienda/gestion/editar/' + Number(req.params.idPadre) + "?mensaje=Complete los campos obligatorios " + inputs);
            } else {
                const respuestaCrear = await this._productosService.editar(producto);
                res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
            }


        } catch (e) {
            //console.error(e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }
    }

    @Post('buscar/:idPadre')
    async buscar(
        @Res() res,
        @Req() req,
        @Body() body,
        @Session() session
    ) {

        console.log(body);

        //if(this._loginService.validarCookies(req,res)){


        try {
            const listaProductos = await this._productosService.buscar(body.nombreBusqueda, body.fechaBusqueda);
            res.render('Administrador/gestionProductos.ejs', {
                //usuario:req.signedCookies.usuario,
                usuario: session.username,
                listaProductos: listaProductos,
                idPadre: req.params.idPadre
            });
        } catch (e) {
            console.log(e)
        }
        //}
    }

    @Get('consultaProductos')
    async productos(@Res() res,
        @Req() req
    ) {
        console.log(Number(req.params.idPadre));

        try {

            const listaProductos = await this._productosService.listarTodo();

            console.log(listaProductos);
            res.render({
                listaProductos: listaProductos
            });

        }
        catch (e) {
            console.error(e)
        }
    }

    @Post('consultar-por-id/:pedido')
    //@Render ('api/menu')
    async consultar(
        @Req() req,
        @Body() body,
        @Session() session,
        @Res() res
    ) {
        try {

            const listaProductos = await this._productosService.listaProductos(Number(body.tiendaId));
            console.log(listaProductos);
            res.redirect('/api/menu?pedido=' + req.params.pedido + "&tienda=" + body.tiendaId);
        }
        catch (e) {
            console.error(e)
        }
    }
}