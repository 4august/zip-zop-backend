import { Body, Controller, Get, Post } from "@nestjs/common"
import { MessageService } from "./message.service"
import { Public } from "src/auth/decorators/public.decorator"

@Controller('message')
export class MessageController {
    constructor(private readonly service: MessageService) { }

    @Public()
    @Get()
    listarUsuarios() {
        return this.service.findAll()
    }

    @Public()
    @Post("/enviar")
    async enviarMensagem(@Body() dto) {
        return this.service.sendMessage(dto)
    }
}