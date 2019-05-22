import {Controller, Get, Res} from "@nestjs/common";

@Controller('api/xiaomi')
export class XiaomiContoller {
    constructor(){

    }
    @Get("pagina")
    paginaXiaomi(
        @Res() res
    ){
        res.render('xiaomi/paginaXiaomi',{
        })
    }
}

