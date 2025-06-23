import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioInputDto } from "./usuario.dto";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @Get()
    listarUsuarios(){
        return this.usuarioService.listarUsuarios()
    }

    @Post()
    createUser(@Body() req: UsuarioInputDto){
        return this.usuarioService.createUsuario(req)
    }
}