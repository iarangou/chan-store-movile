import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Model } from 'mongoose';

import { User, UserDocument } from '../users/schemas/user.schema';
import { ResetPasswordDto } from './dto/reset-password.dto';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async resetPassword(
    dto: ResetPasswordDto,
    requestId: string,
  ): Promise<{ ok: boolean; message: string; requestId: string }> {
    const { token, password, confirmPassword } = dto;

    if (!token) {
      throw new BadRequestException({
        ok: false,
        code: 'TOKEN_REQUIRED',
        message: 'Token requerido',
        requestId,
      });
    }

    if (!password || password !== confirmPassword) {
      throw new BadRequestException({
        ok: false,
        code: 'PASSWORD_MISMATCH',
        message: 'Las contraseñas no coinciden',
        requestId,
      });
    }

    const tokenHash = sha256(token);

    // Busca el usuario con el token de reset válido (no expirado)
    const user = await this.userModel
      .findOne({
        resetPasswordTokenHash: tokenHash,
        resetPasswordExpires: { $gt: new Date() },
      })
      .select('_id email')
      .lean();

    if (!user) {
      throw new BadRequestException({
        ok: false,
        code: 'TOKEN_INVALID',
        message: 'Token inválido o expirado',
        requestId,
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Escribimos en passwordHash (lo que usa el login) y también en password por compatibilidad.
    const update = {
      $set: {
        passwordHash: hashed,
        password: hashed,
      },
      $unset: {
        resetPasswordTokenHash: '',
        resetPasswordExpires: '',
      },
    };

    // Usamos updateOne con opciones similares a tu código original
    const result = await this.userModel.updateOne(
      { _id: user._id },
      update,
      {
        runValidators: false, // evita errores de validación de otros campos (por ejemplo "name is required")
        strict: false, // permite campos no definidos en el schema
      },
    );

    if (!result?.acknowledged || result.matchedCount !== 1) {
      throw new NotFoundException({
        ok: false,
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado al actualizar',
        requestId,
      });
    }

    // Relee el documento y verifica que el hash quedó persistido
    const check: any = await this.userModel.findById(user._id).lean();
    const storedHash: string | null =
      check?.passwordHash || check?.password || null;

    if (!storedHash) {
      throw new InternalServerErrorException({
        ok: false,
        code: 'NO_PASSWORD_FIELD',
        message:
          'No se encontró un campo de contraseña persistido (passwordHash/password). Revisa el esquema o el modo estricto.',
        requestId,
      });
    }

    // Confirmamos que el hash guardado corresponde a la nueva contraseña
    const match = await bcrypt.compare(password, storedHash);
    if (!match) {
      throw new InternalServerErrorException({
        ok: false,
        code: 'PASSWORD_NOT_PERSISTED',
        message:
          'La nueva contraseña no coincide con el hash guardado. Verifica el nombre del campo en el esquema/login.',
        requestId,
      });
    }

    return {
      ok: true,
      message: 'Contraseña actualizada exitosamente',
      requestId,
    };
  }
}
