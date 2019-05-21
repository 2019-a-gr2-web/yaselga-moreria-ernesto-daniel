import {Controller, Get, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";


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
}