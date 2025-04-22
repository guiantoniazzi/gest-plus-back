import { IsString, MaxLength } from 'class-validator';

export class Login {
    @IsString()
    @MaxLength(8, { message: 'Usuário deve ter no máximo 8 caracteres.' })
    usuario?: string;

    @IsString()
    senha?: string;
}