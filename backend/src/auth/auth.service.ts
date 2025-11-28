// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { User, UserDocument } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

interface AuthLoginResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  cookie: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registro de usuario adaptado desde la API de Next.js:
   * - Valida campos obligatorios.
   * - Normaliza y valida el nombre (2–60 caracteres).
   * - Valida que password y confirmPassword coincidan.
   * - Verifica que el correo no esté registrado.
   * - Hashea la contraseña con bcrypt.
   * - Crea el usuario en MongoDB.
   * - Devuelve { ok, message, id } para consumo desde la app mobile.
   */
  async register(
    dto: RegisterAuthDto,
  ): Promise<{ ok: boolean; message: string; id: string }> {
    const { name, email, password, confirmPassword } = dto;

    const _name = String(name || '').trim();
    const _email = String(email || '').trim().toLowerCase();
    const _password = String(password || '');
    const _confirmPassword = String(confirmPassword || '');

    // Validación de campos obligatorios
    if (!_name || !_email || !_password || !_confirmPassword) {
      throw new BadRequestException('Todos los campos son obligatorios');
    }

    // Validación de longitud de nombre (2–60)
    if (_name.length < 2 || _name.length > 60) {
      throw new BadRequestException(
        'El nombre debe tener entre 2 y 60 caracteres',
      );
    }

    // Validación de confirmación de contraseña
    if (_password !== _confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    // Verificar si ya existe un usuario con ese email
    let existing: UserDocument | null;
    try {
      existing = await this.userModel.findOne({ email: _email }).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al verificar el correo del usuario',
      );
    }

    if (existing) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // Hashear contraseña
    let hash: string;
    try {
      hash = await bcrypt.hash(_password, 10);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al procesar la contraseña',
      );
    }

    // Crear usuario
    const user = await this.userModel.create({
      name: _name,
      email: _email,
      passwordHash: hash,
    });

    return {
      ok: true,
      message: 'Usuario creado',
      id: user._id.toString(),
    };
  }

  /**
   * Lógica de login adaptada desde la versión Next.js:
   * - Normaliza email (lowercase + trim).
   * - Busca el usuario por email.
   * - Soporta passwordHash o password (por temas de seed/esquemas antiguos).
   * - Compara el hash con bcrypt.
   * - Firma un JWT con { id, email }.
   * - Genera un string de cookie HTTP-only (para web) y devuelve también el token (para mobile).
   */
  async login(loginDto: LoginDto): Promise<AuthLoginResult> {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email y contraseña requeridos');
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user: UserDocument | null;
    try {
      user = await this.userModel.findOne({ email: normalizedEmail }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario');
    }

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Soporta passwordHash o password (por si el esquema/seed usa uno u otro)
    const hash = (user as any).passwordHash || (user as any).password;
    if (!hash) {
      throw new UnauthorizedException('Usuario sin contraseña registrada');
    }

    const ok = await bcrypt.compare(password, hash);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      id: String(user._id),
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      // Opcional: puedes dejar solo la configuración en JwtModule
      expiresIn: '7d',
    });

    // Construimos el string de cookie similar a NextResponse
    const cookieParts = [
      `token=${token}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
      'Max-Age=604800', // 7 días
    ].filter(Boolean);

    const cookie = cookieParts.join('; ');

    return {
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      cookie,
    };
  }
}
