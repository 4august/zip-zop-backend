import mongoose, { Document } from "mongoose";

export class UsarioOutputDto extends Document{
    username: string;
    email: string;
    nome: string;
    senha: string;
}