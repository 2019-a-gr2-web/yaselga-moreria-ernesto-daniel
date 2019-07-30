import {Controller} from "@nestjs/common";
import { LoginService } from "./login.service";


@Controller('api/login')
export class LoginController {
    constructor(private readonly _loginService:LoginService){

    }
}