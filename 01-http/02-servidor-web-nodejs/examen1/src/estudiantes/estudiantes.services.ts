import { Injectable } from '@nestjs/common';
import {Estudiante} from "./interfaces/estudiantes";

@Injectable()
export class EstudianteService {
    bddEstudiante: Estudiante[]=[];
    recnum=1;
    constructor (){
    }

    crearEstudiante(nuevoEstudiante: Estudiante):Estudiante {
        nuevoEstudiante.id= this.recnum;
        this.recnum++;
        this.bddEstudiante.push(nuevoEstudiante);
        return nuevoEstudiante;
    }

    eliminarPorId(id:number):Estudiante[]{
        console.log('id:', id);
        const indice= this.bddEstudiante.findIndex(
            (estudiante)=>{
                return estudiante.id===id
            }
        );
        this.bddEstudiante.splice(indice,1);
        return this.bddEstudiante;
    }

    buscarPorNombre(nombre: string) {
        console.log('nombre:', nombre);
        const resultado=this.bddEstudiante.filter(
            (estudiante)=>{
                return estudiante.nombre.includes(nombre);
            }
        );
        console.log('resultado:',resultado);
        return resultado;
    }

}
