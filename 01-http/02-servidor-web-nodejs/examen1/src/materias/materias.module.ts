import { Module } from '@nestjs/common';
import {MateriasController} from "./materias.controller";
import {MateriaService} from "./materias.service";
@Module({
    imports: [],//Modulos
    controllers: [MateriasController], //Controladores
    providers: [MateriaService], //Servicios
    exports:[MateriaService] //Exportar servicios
})
export class MateriassModule {

}