import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Email должен быть email-ом' })
  email: string;

  @MinLength(1, { message: 'Пароль должен быть больше 0 символа' })
  @MaxLength(16, { message: 'Пароль не должен быть больше 16 символов' })
  password: string;
}
