import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNomeInputDto {
    @IsNotEmpty({message: "nome não pode estar vazio"})
    @IsString()
    nome: string;

}