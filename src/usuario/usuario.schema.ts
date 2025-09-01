import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Usuario {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    senha: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
    chats: Types.ObjectId[];

    @Prop({ select: false })
    __v: number;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);