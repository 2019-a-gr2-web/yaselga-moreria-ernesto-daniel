import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { DetalleEntity } from "../Detalle/detalle.entity";
import { UsuarioEntity } from "../Usuario/usuario.entity";

@Entity('pedido') // Nombre tabla
export class PedidoEntity {

    @PrimaryGeneratedColumn()
    pedidoId:number;

    @Column({
        length:'300'
    })
    nombre:string;

    @Column({
        length:'300'
    })
    direccion:string;

    @Column({
        length:'300'
    })
    telefono:string;

    @Column({
        length:'300'
    })
    cedula:string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable:true
    })
    totalSinImpuestos: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable:true
    })
    totalPedido: number;

    @Column({
        type:'int',
        default:1//iniciado
    })
    estado: number;

    @OneToMany(type => DetalleEntity,
        detalle=> detalle.pedidoId)
    detalles:DetalleEntity[];

    @ManyToOne(type => UsuarioEntity,
        usuario=> usuario.pedidos)
    usuarioId:UsuarioEntity;
}