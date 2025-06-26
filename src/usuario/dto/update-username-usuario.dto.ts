import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUsernameInputDto {
    @IsNotEmpty({message: "username não pode estar vazio"})
    @IsString()
    username: string;

}