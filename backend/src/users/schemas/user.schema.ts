// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  passwordHash?: string;

  // 👇 Añadimos explícitamente estos campos para que TS los conozca
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

// 👇 aquí es donde TS “arma” el tipo con todos los campos
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
