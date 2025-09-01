import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from '../message/message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ChatModule } from 'src/chat/chat.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]), forwardRef(() => ChatModule)],
    controllers: [MessageController],
    exports: [MessageService],
    providers: [MessageService, MongooseModule]
})
export class MessageModule { }
