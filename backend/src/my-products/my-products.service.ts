import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMyProductDto } from './dto/create-my-product.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateMyProductDto } from './dto/update-my-product.dto';
import {
    MyProduct,
    MyProductDocument,
} from './schemas/my-product.schema';

@Injectable()
export class MyProductsService {
  constructor(
    @InjectModel(MyProduct.name)
    private readonly myProductModel: Model<MyProductDocument>,
  ) {}

  private buildImagesArray(dto: {
    images?: string[];
    image?: string;
  }): string[] {
    if (Array.isArray(dto.images) && dto.images.length > 0) {
      return dto.images;
    }
    if (dto.image) {
      return [String(dto.image)];
    }
    return [];
  }

  async create(createDto: CreateMyProductDto, userId: string) {
    const name = (createDto.name ?? '').trim();
    if (!name) {
      throw new BadRequestException('El nombre es obligatorio');
    }

    const images = this.buildImagesArray(createDto);

    const doc = await this.myProductModel.create({
      userId,
      name,
      description: createDto.description ?? '',
      price:
        typeof createDto.price === 'number' ? createDto.price : 0,
      stock:
        typeof createDto.stock === 'number' ? createDto.stock : 0,
      images,
      category: createDto.category ?? '',
      isActive:
        typeof createDto.isActive === 'boolean'
          ? createDto.isActive
          : true, // default true SOLO en POST
    });

    return doc;
  }

  async findAllByUser(
    userId: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<{
    data: any[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  }> {
    const rawLimit = paginationQuery.limit ?? 50;
    const rawPage = paginationQuery.page ?? 1;

    const limit = Math.min(Number(rawLimit), 100);
    const page = Math.max(Number(rawPage), 1);

    const [data, total] = await Promise.all([
      this.myProductModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.myProductModel.countDocuments({ userId }).exec(),
    ]);

    const pages = limit > 0 ? Math.ceil(total / limit) : 0;

    return {
      data,
      page,
      limit,
      total,
      pages,
    };
  }

  async findOneByUser(id: string, userId: string) {
    const doc = await this.myProductModel
      .findOne({ _id: id, userId })
      .lean()
      .exec();

    if (!doc) {
      throw new NotFoundException('Producto no encontrado');
    }

    return doc;
  }

  async updateForUser(
    id: string,
    updateDto: UpdateMyProductDto,
    userId: string,
  ) {
    const name = (updateDto.name ?? '').trim();
    // Igual que tu PATCH original: requiere nombre no vacío
    if (!name) {
      throw new BadRequestException('El nombre es obligatorio');
    }

    const images = this.buildImagesArray(updateDto);

    const update: any = {
      name,
      description: updateDto.description ?? '',
      price:
        typeof updateDto.price === 'number' ? updateDto.price : 0,
      stock:
        typeof updateDto.stock === 'number' ? updateDto.stock : 0,
      images,
      category:
        typeof updateDto.category === 'string'
          ? updateDto.category
          : '',
    };

    // Solo actualizar isActive si viene explícito
    if (typeof updateDto.isActive === 'boolean') {
      update.isActive = updateDto.isActive;
    }

    const doc = await this.myProductModel
      .findOneAndUpdate({ _id: id, userId }, { $set: update }, { new: true })
      .lean()
      .exec();

    if (!doc) {
      throw new NotFoundException('Producto no encontrado');
    }

    return doc;
  }

  async removeForUser(id: string, userId: string) {
    await this.myProductModel.deleteOne({ _id: id, userId }).exec();
    return { ok: true };
  }
}
