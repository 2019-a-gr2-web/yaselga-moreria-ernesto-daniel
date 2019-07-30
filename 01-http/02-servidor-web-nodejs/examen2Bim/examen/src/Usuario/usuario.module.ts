import {Module} from "@nestjs/common";
import {LoginModule} from "../Login/login.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Module({
    imports:[LoginModule,

        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default'
        ),
    ],
    controllers:[
    ],
    providers:[UsuarioService
    ],
    exports:[
        UsuarioService
    ]
})

export class UsuarioModule {

}