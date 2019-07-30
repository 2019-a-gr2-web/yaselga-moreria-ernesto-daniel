import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TiendaEntity } from "./padre.entity";
import { Repository } from "typeorm";

@Injectable()
export class TiendaService {
    constructor(@InjectRepository(TiendaEntity)
    private readonly _tiendaRepository: Repository<TiendaEntity>) {
    }
    findAll():Promise<TiendaEntity[]>{
        return this._tiendaRepository.find();
    }
}