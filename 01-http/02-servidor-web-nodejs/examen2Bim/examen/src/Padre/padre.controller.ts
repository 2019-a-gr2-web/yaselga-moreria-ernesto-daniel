import { Controller } from "@nestjs/common";
import { TiendaService } from "./padre.service";
import { LoginService } from "../Login/login.service";

@Controller('api/padre')
export class TiendaController{
    constructor(
        private readonly _tiendaService:TiendaService,
        private readonly _loginService_:LoginService
    ){
        
    }
}