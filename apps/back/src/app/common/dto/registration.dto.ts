import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsEmailExist } from '../../../common/decorators/validate';

export class RegistrationDto {
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  name: string;

  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  surname: string;

  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  phone: string;

  @IsEmail({}, { message: 'В этом поле должен быть email' })
  @IsEmailExist({ message: 'Email уже занят' })
  email: string;

  @MinLength(6, { message: 'Пароль дожен содержать больше 6 символов' })
  @MaxLength(16, { message: 'Пароль должен содержать меньше 16 символов' })
  password: string;
}
