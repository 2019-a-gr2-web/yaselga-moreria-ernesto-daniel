import {Module} from "@nestjs/common"
import {TragosContoller} from "./tragos.contoller";
import {TragosService} from "./tragos.service";
import {TragosEntity} from "./tragos.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports:[
        TypeOrmModule.forFeature([TragosEntity],'default')
    ], // Modulos
    controllers:[TragosContoller], // Controladores
    providers:[TragosService], // Servicios
    exports:[TragosService] //Exportar servicios
})
export class TragosModule{

}