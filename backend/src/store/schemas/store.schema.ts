import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({
  timestamps: true,
})
export class Store {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // una sola tienda por usuario
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 60,
  })
  name: string;

  @Prop({
    trim: true,
  })
  description?: string;

  @Prop()
  image?: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
