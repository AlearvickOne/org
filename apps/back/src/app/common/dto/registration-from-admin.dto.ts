import { RegistrationDto } from './registration.dto';
import { IsOptional } from 'class-validator';

export class RegistrationFromAdminDto extends RegistrationDto {
  @IsOptional()
  id: number;

  @IsOptional()
  role: number;

  @IsOptional()
  override password: string;
}
