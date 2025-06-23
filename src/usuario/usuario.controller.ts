import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioInputDto } from "./dto/create-usuario.dto";
import { UpdateNomeInputDto } from "./dto/update-usuario.dto";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
    listarUsuarios() {
        return this.usuarioService.listarUsuarios()
    }

    @Post()
    createUser(@Body() req: UsuarioInputDto) {
        return this.usuarioService.createUsuario(req)
    }

    @Put("/:id")
    updateUser(@Body() req: UpdateNomeInputDto, @Param("id") id: string) {
        return this.usuarioService.updateName(req, id)
    }
}