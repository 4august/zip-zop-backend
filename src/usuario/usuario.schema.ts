import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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

    @Prop({ select: false })
    __v: number;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);