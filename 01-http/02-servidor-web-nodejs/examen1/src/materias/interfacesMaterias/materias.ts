export interface Materia{
    id?: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: boolean;
    fecha_Creacion: Date;
    numeroHorasPorSemana: number;
    estudianteID: number;

}
/*nombre (entero)
- codigo
- descripcion
- activo (booleano)
- fechaCreacion
- numeroHorasPorSemana (entero)
-estudianteId*/