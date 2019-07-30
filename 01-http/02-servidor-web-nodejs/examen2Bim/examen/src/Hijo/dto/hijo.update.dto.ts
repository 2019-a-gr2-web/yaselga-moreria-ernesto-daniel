import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { TiendaEntity } from "../../Padre/padre.entity";


export class ProductosCreateDto{

    @IsEmpty()
    productoId?:number;

    @IsString()
    @IsOptional()
    descripcion:string;

    @IsNumber()
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