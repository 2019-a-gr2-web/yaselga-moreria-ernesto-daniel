import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TragosEntity } from "src/tragos/tragos.entity";

@Entity('db_fiesta')
export class FiestaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;

    @ManyToOne(type => TragosEntity, trago => trago.fiesta)
    tragoId : TragosEntity;
    
}