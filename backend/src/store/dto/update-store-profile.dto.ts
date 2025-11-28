import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateStoreProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 60, {
    message: 'El nombre debe tener entre 2 y 60 caracteres',
  })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
