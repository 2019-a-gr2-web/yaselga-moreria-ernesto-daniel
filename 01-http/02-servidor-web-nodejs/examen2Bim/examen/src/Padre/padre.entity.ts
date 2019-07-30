import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductoEntity } from "../Hijo/hijo.entity";

@Entity('Tienda')
export class TiendaEntity{
    @PrimaryGeneratedColumn()
    TiendaId:number;

    @Column({
        length:100,
    })
    nombre:string;

    @Column({
        length:300,
    })
    direccion:string;

    @Column({
        default:'2019-07-30',
    })
    fechaApertura:Date;

    @Column({
    })
    RUC: number;

    @Column({
        default:true,
    })
    matriz: boolean
    
    @OneToMany(
        type => ProductoEntity,
        producto => producto.tiendaId
        )
        productos:ProductoEntity[];
    
}