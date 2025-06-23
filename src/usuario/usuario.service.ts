import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Usuario } from "./usuario.schema";
import { Model } from "mongoose";
import { UsuarioInputDto } from "./dto/create-usuario.dto";
import { UpdateNomeInputDto } from "./dto/update-nome-usuario.dto";
import { UpdateUsernameInputDto } from "./dto/update-username-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario.name)
        private readonly usuarioModel: Model<Usuario>
    ) { }
    async listarUsuarios() {
        return await this.usuarioModel.find()
    }

    async findByEmailOrUsername(email: string, username: string) {
        const usuario = await this.usuarioModel.find({ $or: [{ email }, { username }] });

        if (usuario.length > 0) throw new BadRequestException("Usuário com username ou email já encontrado")

        return usuario
    }

    async handleUpdateUsuario(dto, id: string) {
        return await this.usuarioModel.findByIdAndUpdate(id, { ...dto });
    }

    async createUsuario(dto: UsuarioInputDto) {
        const { email, username } = dto;

        const usuarioExiste = await this.findByEmailOrUsername(email, username)

        if (usuarioExiste == null) return usuarioExiste

        const usuario = new this.usuarioModel(dto);
        return usuario.save()
    }

    async updateName(dto: UpdateNomeInputDto, id: string) {
        return await this.handleUpdateUsuario(dto, id)
    }

    async updateUsername(dto: UpdateUsernameInputDto, id: string) {
        const userNameExiste = await this.findByEmailOrUsername("", dto.username)

        if (userNameExiste == null) return userNameExiste

        return await this.handleUpdateUsuario(dto, id)
    }
}