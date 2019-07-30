import {Module} from "@nestjs/common";
import {DetalleEntity} from "./detalle.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DetalleService} from "./detalle.service";

@Module({
    imports:[

        TypeOrmModule.forFeature(
            [
                DetalleEntity
            ],
            'default'
        ),
    ],
    controllers:[

    ],
    providers:[
        DetalleService,
    ],
    exports:[
        DetalleService,
    ]
})

export class DetalleModule {

}