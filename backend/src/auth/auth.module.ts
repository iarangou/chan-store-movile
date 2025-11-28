// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    // Importamos UsersModule por si AuthService necesita usar UsersService
    // (por ejemplo para login, obtener usuario, etc.).
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  // Exportamos AuthService (como ya tenías) y JwtModule por si otros módulos
  // necesitan firmar/verificar tokens sin volver a registrar JwtModule.
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
