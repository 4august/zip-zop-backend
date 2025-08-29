import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './message.dto';


@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) { }

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    async handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, room: string) {
        client.join(room);

        const messages = await this.chatService.findLastMessages(room);
        client.emit('previousMessages', messages.reverse());
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(_, payload: CreateMessageDto) {
        const savedMessage = await this.chatService.create(payload);

        this.server.to(payload.room).emit('newMessage', savedMessage);
    }
}
