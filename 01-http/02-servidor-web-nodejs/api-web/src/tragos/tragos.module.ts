import {Module} from "@nestjs/common"
import {TragosContoller} from "./tragos.contoller";
import {TragosService} from "./tragos.service";
@Module({
    imports:[], // Modulos
    controllers:[TragosContoller], // Controladores
    providers:[TragosService], // Servicios
    exports:[TragosService] //Exportar servicios
})
export class TragosModule{

}