import { Module } from "@nestjs/common";
import { ProductosService } from "./hijo.service";
import { ProductoController } from "./hijo.controller";
import { LoginModule } from "../Login/login.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductoEntity } from "./hijo.entity";

@Module({
    imports:[
        LoginModule,
        TypeOrmModule.forFeature([
            ProductoEntity
        ],
        'default'),
    ],
    controllers:[
        ProductoController
    ],
    providers:[
        ProductosService
    ],
    exports:[
        ProductosService
    ]
})
export class ProductosModule{
    
}