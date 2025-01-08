import { IsEmail, MaxLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Поле не содержит Email' })
  email: string;

  @MaxLength(16, { message: 'Не более 16 символов' })
  password: string;
}
