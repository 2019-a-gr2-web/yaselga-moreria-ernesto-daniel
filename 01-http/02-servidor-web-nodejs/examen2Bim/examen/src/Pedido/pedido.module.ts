import {Module} from "@nestjs/common";
import {LoginModule} from "../Login/login.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PedidoEntity} from "./pedido.entity";
import {PedidoController} from "./pedido.controller";
import {PedidoService} from "./pedido.service";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {UsuarioModule} from "../Usuario/usuario.module";
import {DetalleModule} from "../Detalle/detalle.module";
import {PedidoGateway} from "./pedido.gateway";

@Module({
    imports:[LoginModule,UsuarioModule,DetalleModule,

        TypeOrmModule.forFeature(
            [
                PedidoEntity
            ],
            'default'
        ),
    ],
    controllers:[
        PedidoController
    ],
    providers:[
        PedidoService,PedidoGateway
    ],
    exports:[
        PedidoService,
    ]
})

export class PedidoModule {

}