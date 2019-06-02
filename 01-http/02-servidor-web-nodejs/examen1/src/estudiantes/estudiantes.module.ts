import { Module } from '@nestjs/common';
import {EstudianteController} from "./estudiantes.controller";
import {EstudianteService} from "./estudiantes.services";
@Module({
    imports: [],//Modulos
    controllers: [EstudianteController], //Controladores
    providers: [EstudianteService], //Servicios
    exports:[EstudianteService] //Exportar servicios
})
export class EstudianteModule {

}