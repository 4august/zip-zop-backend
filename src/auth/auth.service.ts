import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(
        username: string,
        pass: string,
    ){
        const user = await this.usuarioService.findByEmailOrUsername(username, username);

        if (!user || user.senha !== pass) {
            throw new UnauthorizedException("Usuário não encontrado ou senha incorreta");
        }
        const {senha, ...rest} = user.toObject()

        return {
            access_token: await this.jwtService.signAsync({...rest}),
        };
    }
}
