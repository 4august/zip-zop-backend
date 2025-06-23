import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUsuarioInputDto {
    // @IsNotEmpty({message: "username não pode estar vazio"})
    // @IsString()
    // username: string;

    @IsNotEmpty({message: "nome não pode estar vazio"})
    @IsString()
    nome: string;

}