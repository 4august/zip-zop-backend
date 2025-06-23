import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post("/login")
    logar(@Body() req){
        return this.authService.signIn(req.username, req.senha)
    }
}
