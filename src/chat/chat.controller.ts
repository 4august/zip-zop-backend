import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { ChatService } from "./chat.service";
import { Public } from "src/auth/decorators/public.decorator";
import { CreateChatDto } from "./dto/chat.create.dto";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Public()
    @Get(":id")
    listarUsuarios(@Param("id") socket_id: string) {
        return this.chatService.findMessagesByChat(socket_id)
    }

    @Public()
    @Get("/criar")
    async criar(@Body() dto: CreateChatDto) {
        return await this.chatService.create(dto)
    }
}