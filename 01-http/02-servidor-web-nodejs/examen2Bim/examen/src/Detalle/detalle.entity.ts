import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ProductoEntity } from "../Hijo/hijo.entity";
import { PedidoEntity } from "../Pedido/pedido.entity";

@Entity('detalle')
export  class DetalleEntity {

    @PrimaryGeneratedColumn()
    detalleId:number;

  /*  @Column({
        default: 1,
    })
    cantidad:number;
*/
    @ManyToOne(
        type => ProductoEntity,
        producto=> producto.detalles
        )
        prodcutoId:ProductoEntity;

    @ManyToOne(type => PedidoEntity,
        pedido=> pedido.detalles)
    pedidoId:PedidoEntity;

}