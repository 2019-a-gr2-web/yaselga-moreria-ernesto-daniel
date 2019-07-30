import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { TiendaEntity } from "../../Padre/padre.entity";


export class ProductosCreateDto{

    @IsEmpty()
    productoId?:number;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsString()
    @IsOptional()
    descripcion:string;

    @IsNumber()
    @IsNotEmpty()
    precio:number;
    
    @IsDate()
    @IsOptional()
    fechaLanzamiento:Date;

    @IsNumber()
    @IsOptional()
    aniosGarantia:number;

    @IsNotEmpty()
    TiendaId:TiendaEntity;

}