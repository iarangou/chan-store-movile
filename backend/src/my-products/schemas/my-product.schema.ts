import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MyProductDocument = MyProduct & Document;

@Schema({ timestamps: true, collection: 'products' })
export class MyProduct {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: Number, default: 0 })
  stock: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: '' })
  category: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const MyProductSchema = SchemaFactory.createForClass(MyProduct);
