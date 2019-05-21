import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/tragos";
import {transcode} from "buffer";

@Injectable()
export class TragosService{
    bddTragos:Trago[]=[];
    recnum = 1;

    constructor(){
        const traguito:Trago ={
            nombre:'Pilsener',
            gradosalcohol:4.3,
            fecha_caducidad:new Date(2018,5,10),
            precio:1.75,
            tipo:"Cerveza"
        };
        this.crear(traguito);
    }

    crear(nuevoTrago: Trago):Trago{
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }

    buscarPorId(id: number):Trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.id === id;
            }
        );
    }

    buscarPorNombre(nombre: string):Trago{
        return this.bddTragos.find(
            (trago)=>{
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }

    eliminarPorId(id:number):Trago[]{
        const indice = this.bddTragos.findIndex(
            (trago)=>{
                return trago.id === id
            }
        );
        this.bddTragos.splice(indice,1);
        return this.bddTragos;
    }

    actualizar(id:number, tragoActualizado: Trago):Trago[]{
        const indice = this.bddTragos.findIndex(
            (trago)=>{
                return trago.id === id
            }
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice]=tragoActualizado;
        return this.bddTragos;
    }

}