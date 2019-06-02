export interface Estudiante{
    id?: number;
    CI:number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    semestreActual: 1|2|3|4|5|6;
    graduado:boolean;
}

/*nombres
apellidos
fechaNacimiento
semestreActual (entero)
graduado(booleano)*/