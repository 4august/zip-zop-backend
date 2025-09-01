import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Chat {
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }], required: true })
    usuarios: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
    messages: Types.ObjectId[];

    @Prop({ required: true, unique: true })
    socket_id: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);