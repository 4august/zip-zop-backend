import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from '../message/message.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    providers: [ChatService],
    exports: [ChatService]
})
export class ChatModule { }
