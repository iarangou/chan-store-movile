import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UpdateStoreProfileDto } from './dto/update-store-profile.dto';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  /**
   * Devuelve la tienda asociada a un userId. Si no existe, devuelve null.
   */
  async findByUserId(userId: string): Promise<Store | null> {
    try {
      const objectId = new Types.ObjectId(userId);
      const store = await this.storeModel.findOne({ userId: objectId }).lean<Store>();
      return store || null;
    } catch (error) {
      // Por si el userId no es un ObjectId válido u otro error de DB
      throw new InternalServerErrorException(
        error?.message || 'Error al obtener la tienda',
      );
    }
  }

  /**
   * Crea o actualiza (upsert) el perfil de la tienda para el usuario.
   */
  async upsertProfile(
    userId: string,
    dto: UpdateStoreProfileDto,
  ): Promise<Store> {
    try {
      const objectId = new Types.ObjectId(userId);

      const name = dto.name.trim();
      const description = dto.description?.trim() ?? undefined;

      const update = {
        name,
        description,
      };

      await this.storeModel.findOneAndUpdate(
        { userId: objectId },
        {
          $set: update,
          $setOnInsert: { userId: objectId },
        },
        {
          upsert: true,
          new: true,
        },
      );

      const updated = await this.storeModel
        .findOne({ userId: objectId })
        .lean<Store>();

      if (!updated) {
        throw new InternalServerErrorException(
          'No se pudo recuperar la tienda actualizada',
        );
      }

      return updated as Store;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Error al guardar la tienda',
      );
    }
  }
}
