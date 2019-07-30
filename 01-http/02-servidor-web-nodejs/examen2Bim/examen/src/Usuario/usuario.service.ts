import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(UsuarioEntity)
                private readonly _usuarioRepository: Repository<UsuarioEntity>) {
    }

    buscarUsuario(nombreUsuario?,password?,tipoRol?):Promise<UsuarioEntity[]>{
        return this._usuarioRepository.find({
            nombreUsuario:nombreUsuario,
            password:password,
            tipo:tipoRol
        });
    }

    buscarUsuarioPorNombre(nombreUsuario?):Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne({
            nombreUsuario: nombreUsuario
        });
    }
}