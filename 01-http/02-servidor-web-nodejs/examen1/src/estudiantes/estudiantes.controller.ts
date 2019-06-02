import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import {Estudiante} from "./interfaces/estudiantes";
import {EstudianteService} from "./estudiantes.services";

@Controller('/examen')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {
    }

    @Get('/gestionarEstudiante')
    gestionarEstudiante(@Request() request, @Response() response) {
        const cookieSeg = request.signedCookies;
        const arregloEstudiante = this.estudianteService.bddEstudiante;
        if (cookieSeg.nombreUsuario) {
            return response.render('Estudiantes/gestionarEstudiante',{arregloEstudiante:arregloEstudiante,nombre:cookieSeg.nombreUsuario})
        } else {
            return response.redirect('/examen/inicioSesion');
        }
    }

    @Get('/gestionEstudiante')
    gestionarEstudiante1(
        @Headers() headers, 
        @Request() request, 
        @Response() response) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return response.render('Estudiantes/gestionarEstudiante',{arregloEstudiante:arregloEstudianteBusqueda,nombre:cookieSeg.nombreUsuario})
        }
        else{
            return response.redirect('/examen/inicioSesion');
        }

    }

    @Get('/inicioSesion')
    inicioSesion(@Response() res){
        return res.render('login')
    }

    @Get('/gestion')
    gestion(@Response() res, @Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            res.redirect('/examen/gestionarEstudiante')
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }

    @Get('/bienvenido')
    bienvenido(@Response() res,  @Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('paginaPrincipal',{
                nombre:cookieSeg.nombreUsuario
            })
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }

    @Get('/crearEstudiante')
    crearEstudiante( @Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('Estudiantes/crearEstudiante',{
                nombre:cookieSeg.nombreUsuario
            })
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }

    @Post('/login')
    loginCookie1(
        @Headers() headers, 
        @Request() request, 
        @Response() response, 
        @Body('nombre') nombre: string) {
        const cookieSeg = request.signedCookies;
        if (!cookieSeg.nombreUsuario) {
            response.cookie('nombreUsuario', nombre,{signed: true});
            cookieSeg.nombreUsuario=nombre;
        }
        if (cookieSeg.nombreUsuario) {

            response.redirect('/examen/bienvenido')
        }
        else{
            return response.redirect('/examen/inicioSesion');
        }
    }

    @Post('/crearEstudiante')
    crearEstudiantePost(
        @Body() estudiante:Estudiante,
        @Res() res,
        @Request() request
    ){
        const cookieSeg = request.signedCookies;
        estudiante.CI=Number(estudiante.CI);
        estudiante.fecha_nacimiento =new Date(estudiante.fecha_nacimiento);
        estudiante.graduado= Boolean(estudiante.graduado);
        console.log(estudiante);
        this.estudianteService.crearEstudiante(estudiante);
        if (cookieSeg.nombreUsuario) {
            res.redirect('/examen/gestionarEstudiante');
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }


    @Post('eliminar')
    eliminarEstudiante(
        @Res() res,
        @Body('id') id: number,
        @Request() request) {
        const cookieSeg = request.signedCookies;
        this.estudianteService.eliminarPorId(Number(id));
        if (cookieSeg.nombreUsuario) {
            res.redirect('/examen/gestionarEstudiante');
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }


    @Post('/buscarEstudiante')
    buscarEstudiante(
        @Res() res,
        @Body('busquedaEstudiantes') busquedaEstudiantes: string, 
        @Request() request) {
        const cookieSeg = request.signedCookies;
        console.log("busqueda: ",busquedaEstudiantes);
        arregloEstudianteBusqueda=this.estudianteService.buscarPorNombre(busquedaEstudiantes);
        console.log('imprimiendo arreglo estudiantes:',arregloEstudianteBusqueda);
        if(busquedaEstudiantes!=null){
            if (cookieSeg.nombreUsuario) {
                res.redirect('/examen/gestionEstudiante');
            }
            else{
                return res.redirect('/examen/inicioSesion');
            }
        }else {
            if (cookieSeg.nombreUsuario) {
                res.redirect('/examen/gestionEstudiante');
            }
            else{
                return res.redirect('/examen/inicioSesion');
            }
        }
    }

    @Post('/borrarCookie')
    borrarCookiemethod(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        response.clearCookie("nombreUsuario");
        response.redirect('/examen/inicioSesion')
    }
}

let arregloEstudianteBusqueda:Estudiante[];