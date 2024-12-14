import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'В этом поле должен быть email' })
  email: string;

  @MaxLength(16, { message: 'Пароль должен содержать меньше 16 символов' })
  password: string;
}
