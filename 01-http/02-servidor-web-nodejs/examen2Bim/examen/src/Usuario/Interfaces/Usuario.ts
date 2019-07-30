export interface Usuario {

    idUsuario?:number;
    nombreUsuario:string;
    passUsuario:string;
    tipoUsuario?: 'Admin' | 'Usuario' | 'Despachador';

}