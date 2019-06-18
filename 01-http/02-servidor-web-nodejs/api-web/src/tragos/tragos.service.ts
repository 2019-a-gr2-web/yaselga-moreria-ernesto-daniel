import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/tragos";
import {transcode} from "buffer";
import {TragosEntity} from "./tragos.entity"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TragosService{
    bddTragos:Trago[]=[];
    recnum = 1;

    constructor(
        @InjectRepository(TragosEntity) 
        private readonly _tragosRepository: Repository<TragosEntity>,){

            const traguito:Trago ={
            nombre:'Pilsener',
            gradosalcohol:4.3,
            fecha_caducidad:new Date(2018,5,10),
            precio:1.75,
            tipo:"Cerveza"};

            const objetoEntidad = this._tragosRepository.create(traguito)

            this._tragosRepository
            .save(objetoEntidad) //Promesa
            .then(
                (datos)=>{
                    console.log('Dato Creado: ', datos);
                }
            )
            .catch(
                (error)=>{
                    console.error('Error:', error);
                }
            )
            this.crear(traguito);
    }

    crear(nuevoTrago:Trago):Promise<Trago>{
        /*
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
        */
       
        const objetoEntidad = this._tragosRepository.create(nuevoTrago);
        return this._tragosRepository.save(objetoEntidad);
    }
    
    buscar(parametrosDeBusqueda?):Promise<Trago[]>{
        return this._tragosRepository.find(parametrosDeBusqueda);
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