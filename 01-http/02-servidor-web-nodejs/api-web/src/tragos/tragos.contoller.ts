import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/tragos";
import {type} from "os";


@Controller('api/traguito')
export class TragosContoller {

    constructor(private readonly _tragosService:TragosService){

    }

    @Get("lista")
    listarTragos(
        @Res() res
    ){
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
    }
    @Get('crear')
    crearTrago(
        @Res() res
    ){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    crearTragoPost(
        @Body() trago:Trago,
        @Res() res,
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosalcohol') gradosalcohol:number,
        // @Body('fecha_caducidad') fecha_caducidad:Date,
        // @Body('precio') precio:number,
    ){
        trago.gradosalcohol = Number(trago.gradosalcohol);
        trago.precio = Number(trago.precio);
        trago.fecha_caducidad = new Date(trago.fecha_caducidad);
        console.log('Trago:',trago);

        this._tragosService.crear(trago);

        res.redirect('/api/traguito/lista');
        // console.log('nombre:',nombre, typeof nombre);
        // console.log('tipo:',tipo, typeof tipo);
        // console.log('gradosalcohol:',gradosalcohol, typeof gradosalcohol);
        // console.log('fecha_caducidad:',fecha_caducidad, typeof fecha_caducidad);
        // console.log('precio:',precio, typeof precio);
    }
    @Post('borrar')
    borrarTragoPost(
        @Body() trago:Trago,
        @Res() res,
    ){

        this._tragosService.eliminarPorId(Number(trago.id));
        console.log('se ha eliminado el trago:',trago);
        res.redirect('/api/traguito/lista');
    }
}