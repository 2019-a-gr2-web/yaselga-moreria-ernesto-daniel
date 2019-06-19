import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/tragos";
import {type} from "os";
import { validate } from "class-validator";
import { TragosCreateDto } from "./dto/tragos.create.dto";


@Controller('api/traguito')
export class TragosContoller {

    constructor(private readonly _tragosService:TragosService){

    }

    @Get("lista")
    async listarTragos(
        @Res() res
    ){
        const arregloTragos = await this._tragosService.buscar();
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
    async crearTragoPost(
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

        // trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;

        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fecha_caducidad = trago.fecha_caducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosalcohol = trago.gradosalcohol;

        try{
            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {

                console.error(errores);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');

            } else {

                const respuestaCrear = await this._tragosService
                    .crear(trago); // Promesa
                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/api/traguito/lista');
            }

        }
        catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }

        
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