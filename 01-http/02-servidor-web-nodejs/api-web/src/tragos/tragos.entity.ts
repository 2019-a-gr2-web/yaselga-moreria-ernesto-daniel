import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { DistribuidorEntity } from "src/distribuidor/distribuidor.entity";
import { FiestaEntity } from "src/fiesta/fiesta.entity";

@Entity('bd_trago') // Nombre tabla
export class TragosEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_trago',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    })
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza';

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'grados_alcohol',
    })
    gradosalcohol: number;

    @Column({
        type: 'date',
        name: 'fecha_caducidad',
    })
    fecha_caducidad: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
    })
    precio: number;

    @ManyToOne(type => DistribuidorEntity, distribuidor => distribuidor.tragos)
    distribuidorId : DistribuidorEntity;

    @OneToMany(type => FiestaEntity, fiesta => fiesta.tragoId)
    fiesta: FiestaEntity[];
}