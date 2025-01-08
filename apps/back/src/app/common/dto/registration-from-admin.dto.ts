import { RegistrationDto } from './registration.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationFromAdminDto extends RegistrationDto {
  @IsOptional()
  id: number;

  @IsNotEmpty({ message: 'Заполните поле' })
  role: string;

  @IsNotEmpty({ message: 'Заполните поле' })
  name: string;

  @IsNotEmpty({ message: 'Заполните поле' })
  surname: string;

  @IsNotEmpty({ message: 'Заполните поле' })
  nickname: string;

  @IsEmail({}, { message: 'Поле не содержит Email' })
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'Не менее 6 символов' })
  @MaxLength(16, { message: 'Не более 16 символов' })
  password: string;

  @IsOptional()
  is_archived: boolean;

  @IsOptional()
  created_at: string;
}
