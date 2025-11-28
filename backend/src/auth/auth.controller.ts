// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   *
   * - Recibe { name, email, password, confirmPassword }.
   * - Usa AuthService.register() para crear el usuario.
   * - Devuelve JSON con { ok: true, message, id }.
   * - Maneja errores de validación y errores internos.
   */
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      // Si es un HttpException (validaciones, correo duplicado, etc.), lo propagamos
      if (error instanceof HttpException) {
        throw error;
      }

      // Para cualquier otro error inesperado, devolvemos el mismo mensaje genérico
      // que la API de Next.js: "Error en el registro"
      // eslint-disable-next-line no-console
      console.error('Error en el registro:', error);

      throw new HttpException(
        { error: 'Error en el registro' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /auth/login
   *
   * - Recibe { email, password }.
   * - Usa AuthService.login() para validar credenciales.
   * - Setea una cookie HTTP-only "token" (útil para web).
   * - Devuelve JSON con { ok: true, token, user } (útil para mobile).
   */
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user, cookie } = await this.authService.login(loginDto);

    // Set-Cookie para clientes web (equivalente al NextResponse de la versión web)
    res.header('Set-Cookie', cookie);

    // Respuesta pensada para la app mobile (y también usable en web)
    return {
      ok: true,
      token,
      user,
    };
  }
}
