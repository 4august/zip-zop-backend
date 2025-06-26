import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioInputDto } from "./dto/create-usuario.dto";
import { UpdateNomeInputDto } from "./dto/update-nome-usuario.dto";
import { UpdateUsernameInputDto } from "./dto/update-username-usuario.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtAuthGuard } from "src/auth/strategy/jwt/jwt.guard";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @UseGuards(AuthGuard)
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

    @Put("/username/:id")
    updateUsername(@Body() req: UpdateUsernameInputDto, @Param("id") id: string) {
        return this.usuarioService.updateUsername(req, id)
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.usuarioService.deleteUsuario(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}