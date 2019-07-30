import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { TiendaEntity } from "../Padre/padre.entity";
import { DetalleEntity } from "../Detalle/detalle.entity";

@Entity('Producto')
export class ProductoEntity{
    @PrimaryGeneratedColumn()
    productoId:number;

    @Column({
        length:100,
    })
    nombre:string;

    @Column({
        length:300,
    })
    descripcion:string;

    @Column({
    })
    precio: number;

    @Column({
        default:'2019-07-30',
    })
    fechaLanzamiento:Date;

    @Column({
        default: 1,
    })
    aniosGarantia: number;

    @ManyToOne(
        type => TiendaEntity,
        tienda=> tienda.productos
        )
        TiendaId:TiendaEntity;

    @OneToMany(
        type => DetalleEntity,
        detalle=> detalle.prodcutoId
        )
        detalles:DetalleEntity[];
    
    
}