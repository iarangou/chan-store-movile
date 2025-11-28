// src/users/users.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * CREATE – Crea un usuario nuevo (con hash de contraseña y email único).
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const email = createUserDto.email.toLowerCase();

    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const created = new this.userModel({
      name: createUserDto.name,
      email,
      passwordHash,
    });

    const saved = await created.save();
    const plain: any = saved.toObject();
    delete plain.passwordHash;
    return plain;
  }

  /**
   * READ – Lista todos los usuarios (sin passwordHash).
   */
  async findAll(): Promise<Omit<User, 'passwordHash'>[]> {
    return this.userModel.find().select('-passwordHash').lean().exec();
  }

  /**
   * READ – Busca un usuario por ID (sin passwordHash).
   */
  async findById(id: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.userModel
      .findById(id)
      .select('-passwordHash')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  /**
   * Utilidad interna para buscar por email (incluyendo passwordHash).
   * La usa AuthService y también create/update.
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
  }

  /**
   * UPDATE – Actualiza campos de un usuario (incluyendo cambio de password).
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const { password, email, ...rest } = updateUserDto;

    const updateData: any = {
      ...rest,
    };

    // Si se envía un nuevo email, validamos que no esté siendo usado por otro usuario
    if (email) {
      const lowerEmail = email.toLowerCase();
      const existingWithEmail = await this.userModel
        .findOne({ email: lowerEmail, _id: { $ne: id } })
        .exec();

      if (existingWithEmail) {
        throw new ConflictException(
          'El email ya está registrado por otro usuario',
        );
      }

      updateData.email = lowerEmail;
    }

    // Si se envía un nuevo password, generamos un nuevo hash
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .select('-passwordHash')
      .lean()
      .exec();

    if (!updated) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return updated;
  }

  /**
   * DELETE – Elimina un usuario por ID.
   */
  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
