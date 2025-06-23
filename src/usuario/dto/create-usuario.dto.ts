import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UsuarioInputDto {
    @IsNotEmpty({message: "username não pode estar vazio"})
    @IsString()
    username: string;

    @IsNotEmpty({message: "email não pode estar vazio"})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "nome não pode estar vazio"})
    @IsString()
    nome: string;

    @IsNotEmpty({message: "senha não pode estar vazia"})
    senha: string

}