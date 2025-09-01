import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
    usuario: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Chat', required: true })
    chat: Types.ObjectId;

    @Prop({ required: true })
    content: string;

    @Prop()
    createdAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
