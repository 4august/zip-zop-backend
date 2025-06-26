import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local/local.guard';
import { Public } from './decorators/public.decorator';

@Controller()
export class AuthController {

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async logar(@Request() req) {
        return req.user
    }
}
