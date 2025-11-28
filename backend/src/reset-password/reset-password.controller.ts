import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import * as crypto from 'crypto';

import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('auth/reset-password')
export class ResetPasswordController {
  constructor(
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Post()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const requestId = crypto.randomBytes(6).toString('hex');

    try {
      const result = await this.resetPasswordService.resetPassword(
        dto,
        requestId,
      );
      return result;
    } catch (error) {
      // Si el servicio lanzó una HttpException, la re-lanzamos tal cual
      if (error instanceof HttpException) {
        throw error;
      }

      // Cualquier otro error se mapea a un 500 con el mismo formato de respuesta
      console.error('[RESET-PASSWORD ERROR]', {
        requestId,
        name: (error as any)?.name,
        code: (error as any)?.code,
        message: (error as any)?.message,
        stack: (error as any)?.stack,
      });

      throw new InternalServerErrorException({
        ok: false,
        code: 'RESET_INTERNAL_ERROR',
        message: 'Error al restablecer la contraseña',
        requestId,
      });
    }
  }
}
