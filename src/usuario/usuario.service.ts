import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Usuario } from "./usuario.schema";
import { Model } from "mongoose";
import { UsuarioInputDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioInputDto } from "./dto/update-usuario.dto";

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
        return await this.usuarioModel.find({ $or: [{ email }, { username }] })
    }

    async createUsuario(dto: UsuarioInputDto) {
        const { email, username } = dto;

        const usuarioExiste = await this.findByEmailOrUsername(email, username)

        if (usuarioExiste.length > 0) throw new BadRequestException("Usuário com username ou email já encontrado")

        const usuario = new this.usuarioModel(dto);
        return usuario.save()
    }

    async updateUsuario(dto: UpdateUsuarioInputDto, id: string){
        
        return await this.usuarioModel.findByIdAndUpdate(id, {...dto})
    }
}