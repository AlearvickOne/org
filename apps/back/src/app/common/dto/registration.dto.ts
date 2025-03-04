import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsEmailExist } from '../../../common/decorators/validate';
import { IsNicknameExist } from '../../../common/decorators/validate/is.nickname.exist';

export class RegistrationDto {
  @IsNotEmpty({ message: 'Заполните поле' })
  name: string;

  @IsNotEmpty({ message: 'Заполните поле' })
  surname: string;

  @IsNotEmpty({ message: 'Заполните поле' })
  @MaxLength(10, { message: 'Максимум 10 символов' })
  @IsNicknameExist({ message: 'Никнейм уже занят' })
  nickname: string;

  @IsEmail({}, { message: 'Поле не содержит Email' })
  @IsEmailExist({ message: 'Email уже занят' })
  email: string;

  @MinLength(6, { message: 'Не менее 6 символов' })
  @MaxLength(16, { message: 'Не более 16 символов' })
  password: string;
}
