import {Module} from "@nestjs/common";
import {DespachoController} from "./despacho.controller";
import { PedidoModule } from "../Pedido/pedido.module";

@Module({
    imports:[PedidoModule],
    controllers:[DespachoController],
    providers:[DespachoController],
    exports:[]

})
export class DespachoModule {

}