import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'node:crypto';
import { Usuario } from 'src/usuario/usuario.schema';
import { Chat } from './chat.schema';
import { CreateChatDto } from './dto/chat.create.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private service: Model<Chat>,
        @InjectModel(Usuario.name) private usuarioService: Model<Usuario>
    ) { }

    async create(dto: CreateChatDto) {
        console.log(dto)


        const usuarios = await this.usuarioService.find({
            _id: { $in: dto.usuarios }
        })
        if (usuarios.length < 2) throw Error("Algum dos usuarios nao foram encontrados")


        const socket_id = randomUUID();
        return await this.service.create({ socket_id: socket_id, usuarios: usuarios })
    }

    async listar() {
        return await this.service.find()
    }

    async findLastMessages(room: string, limit = 50) {
        return this.service
            .find({ room })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()
            .exec();
    }

    async findMessagesByChat(socket_id: string) {
        const messages = await this.service
            .find({ socket_id })
            .populate('usuarios', 'nome username')
            .populate({
                path: 'messages',
                select: "content createdAt",
                populate: {
                    path: 'usuario',
                    select: "username"
                }
            })
            .exec()

        return messages
    }
}
