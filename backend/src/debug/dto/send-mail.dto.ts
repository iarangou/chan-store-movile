import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsOptional()
  @IsEmail({}, { message: 'to debe ser un email válido' })
  to?: string;

  @IsOptional()
  @IsString({ message: 'url debe ser un string' })
  url?: string;
}
