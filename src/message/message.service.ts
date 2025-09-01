import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./message.schema";
import { Model, Types } from "mongoose";
import { Chat } from "src/chat/chat.schema";

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name)
        private readonly message: Model<Message>,

        @InjectModel(Chat.name)
        private readonly chatService: Model<Chat>
    ) { }

    async findAll() {
        return await this.message.find()
    }

    async findByChat(): Promise<Message[]> {
        return this.message
            .find()
            .populate('usuario', 'username nome')
            .populate('messages', 'content')
            .sort({ createdAt: 1 }) // ordenar cronologicamente
            .exec();
    }

    async sendMessage(dto) {
        const message = new this.message({
            usuario: new Types.ObjectId(dto.usuario),
            chat: new Types.ObjectId(dto.chat),
            content: dto.content,
        });

        const savedMessage = await message.save();

        // Opcional: adicionar a mensagem ao array messages do chat
        await this.chatService.findByIdAndUpdate(dto.chat, {
            $push: { messages: savedMessage._id }
        });

        return savedMessage;
    }
}