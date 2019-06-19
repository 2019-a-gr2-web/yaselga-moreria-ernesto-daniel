import { IsEmpty, IsNotEmpty, IsString, IsNumber, IsDate, IsOptional } from "class-validator";


export class TragosCreateDto{
    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsNumber()
    gradosalcohol: number;
    
    @IsNotEmpty()
    @IsString()
    tipo: String;

    @IsOptional()
    @IsDate()
    fecha_caducidad: Date;

    @IsOptional()
    @IsNumber()
    precio:number;   

    @IsOptional()
    @IsNumber()
    distribuidorId: Number;
}