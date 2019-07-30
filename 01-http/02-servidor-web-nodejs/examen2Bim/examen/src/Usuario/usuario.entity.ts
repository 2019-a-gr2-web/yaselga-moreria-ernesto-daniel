import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { PedidoEntity } from "../Pedido/pedido.entity";
import { DetalleEntity } from "../Detalle/detalle.entity";


@Entity('usuario') // Nombre tabla
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    usuarioId?:number;

    @Column({
        length:100
    })
    nombreUsuario?: string;

    @Column({
        length:10
    })
    password?: string;

    @Column({
        length:100
    })
    direccion?: string;

    @Column({
        length:10
    })
    telefono: string;

    @Column({
        length:10
    })
    cedula: string;

    @Column({
        type: 'int',
    })
    tipo?: '1'|'2'|'3';

    @OneToMany(type => PedidoEntity,
        pedido=> pedido.usuarioId)
    pedidos:DetalleEntity[]; // <-- PedidosEntity[]
}