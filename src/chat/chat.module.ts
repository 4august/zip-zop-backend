import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './chat.schema';
import { MessageModule } from 'src/message/message.module';
import { ChatController } from './chat.controller';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]), MessageModule, UsuarioModule],
    controllers: [ChatController],
    providers: [ChatService,],
    exports: [ChatService, MongooseModule]
})
export class ChatModule { }
