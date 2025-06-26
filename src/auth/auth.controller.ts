import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local/local.guard';

@Controller()
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async logar(@Request() req) {
        return req.user
    }
}
