import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoEntity } from "./hijo.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductosService {
    recnum = 1;
    constructor(@InjectRepository(ProductoEntity)
    private readonly _productoRepository: Repository<ProductoEntity>, ) {
    }

    listaProductos(id): Promise<ProductoEntity[]> {
        return this._productoRepository.find({
            where: { productoId: id }
        });
    }

    crear(nuevoProducto: ProductoEntity):Promise<ProductoEntity>{
        const objetoEntidad = this._productoRepository.create(nuevoProducto);
        return this._productoRepository.save(objetoEntidad);
    }

    eliminarPorId(id?:number):Promise<object>{
        return this._productoRepository.delete({
            productoId:id
        });
    }

    buscar(parametrosBusqueda?,fechaBusqueda?):Promise<ProductoEntity[]>{
        if(parametrosBusqueda!=""&&fechaBusqueda!=""){
            return this._productoRepository.find({
                nombre:parametrosBusqueda,
                aniosGarantia:fechaBusqueda
            });
        }else{
            if(parametrosBusqueda==""&& fechaBusqueda !=""){
                return this._productoRepository.find({
                    nombre:parametrosBusqueda
                });
            }else if(parametrosBusqueda!="" && fechaBusqueda==""){
                return this._productoRepository.find({
                    nombre:parametrosBusqueda
                });
            }else{
                return this._productoRepository.find();
            }
        }
    }

    listarTodo():Promise<ProductoEntity[]>{
        return this._productoRepository.find();
    }
}