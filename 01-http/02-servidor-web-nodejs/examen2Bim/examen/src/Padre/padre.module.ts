import { Module } from "@nestjs/common";
import { TiendaController } from "./padre.controller";
import { TiendaService } from "./padre.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TiendaEntity } from "./padre.entity";
import { LoginModule } from "../Login/login.module";

@Module({
    imports:[
        LoginModule,
        TypeOrmModule.forFeature(
            [
                TiendaEntity
            ],
            'default'
        )
    ],
    controllers:[
        TiendaController,
    ],
    providers:[
        TiendaService,
    ],
    exports:[
        TiendaService,
    ]
})

export class TiendaModule{

}