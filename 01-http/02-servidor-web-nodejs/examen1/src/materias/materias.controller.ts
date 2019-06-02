import {Controller, Get, Response, Request, Headers, Post, Body, Res, Param} from '@nestjs/common';
import {MateriaService} from "./materias.service";
import {Materia} from "./interfacesMaterias/materias";

@Controller('/examen/Estudiante')
export class MateriasController {
    constructor(private readonly MateriaService: MateriaService) {

    }
    @Get('/gestionarMaterias/:id')
    gestionarHijos(
        @Param() params, 
        @Headers() headers, 
        @Request() request, 
        @Response() response) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
        const arregloMaterias= this.MateriaService.buscarPorId(Number(id));
        console.log('arrprod:',arregloMaterias);
        if (cookieSeg.nombreUsuario) {

            return response.render('Materias/gestionarMateria',{id:id,arregloMaterias:arregloMaterias,nombre:cookieSeg.nombreUsuario})

        }
        else{
            return response.redirect('/examen/inicioSesion');
        }

    }
    @Get('/busquedaMateria/:id')
    busquedaHijos(@Param() params, @Headers() headers, @Request() request, @Response() response) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {

            return response.render('Materias/gestionarMateria',{id:id,arregloMaterias:arregloMateriaBusqueda,nombre:cookieSeg.nombreUsuario})

        }
        else{
            return response.redirect('/examen/inicioSesion');
        }


    }


    @Get('/crearMateria/:id')
    crearMateria( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);

        if (cookieSeg.nombreUsuario) {

            return res.render('Materias/crearMateria',{
                nombre:cookieSeg.nombreUsuario,
                id:id
            })

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Post('/crearMateria')
    crearMateriaPost(
        @Body() materia:Materia,
        @Res() res,
        @Param() params,
        @Request() request
    ){
        const cookieSeg = request.signedCookies;
        materia.numeroHorasPorSemana=Number(materia.numeroHorasPorSemana);
        materia.codigo=String(materia.codigo);
        materia.descripcion=String(materia.descripcion);
        materia.estudianteID=Number(materia.estudianteID);
        materia.fecha_Creacion =new Date(materia.fecha_Creacion);
        console.log(materia);
        this.MateriaService.crearMateria(materia);
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/Estudiante/gestionarMaterias/'+id);

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Post('eliminarMaterias')
    eliminarMateria(@Param() params,@Res() res,  @Body('EstudianteIdMateria') estudianteID: number,
                   @Body('idMateria') idMateria: number, @Request() request) {

        const cookieSeg = request.signedCookies;
        this.MateriaService.eliminarPorId(Number(idMateria));
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/Estudiante/gestionarMaterias/'+estudianteID);

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Get('/buscarProd/:id')
    buscarMaterias( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);
        if (cookieSeg.nombreUsuario) {

            return res.redirect('/examen/Estudiante/buscarMateria'+id)

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }

        }



    @Post('buscarMateria')
    buscarMateria(@Param() params,@Res() res,
                 @Body('busquedaMaterias') busquedaMaterias: string, @Request() request) {
        const cookieSeg = request.signedCookies;
         arregloMateriaBusqueda=this.MateriaService.buscarPorNombre(busquedaMaterias,id);
        console.log('impiendo arreglo materias:',arregloMateriaBusqueda);

        if(busquedaMaterias!=null){
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/Estudiante/busquedaMateria/'+id);

            }
            else{
                return res.redirect('/examen/inicioSesion');
            }

        }else{
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/Estudiante/gestionarMaterias/'+id);

            }
            else{
                return res.redirect('/examen/inicioSesion');
            }

        }
    }


}
let id:number;
let arregloMateriaBusqueda:Materia[];