import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TragosEntity } from "src/tragos/tragos.entity";

@Entity('db_distribuidor')
export class DistribuidorEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;

    @OneToMany(type => TragosEntity, trago => trago.distribuidorId)
    tragos: TragosEntity[];
}