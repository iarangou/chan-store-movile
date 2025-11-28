import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, isValidObjectId } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const data = {
      ...createProductDto,
      name: createProductDto.name.trim(),
    };

    const product = new this.productModel(data);
    return product.save();
  }

  async findAll(query: QueryProductsDto): Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const q = query.q ?? '';
    const category = query.category ?? '';
    const sortParam = query.sort ?? '-createdAt';

    const filter: FilterQuery<ProductDocument> = {};

    if (q) {
      filter.name = { $regex: q, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;
    const sortOption = sortParam.split(',').join(' '); // "price,-price" => "price -price"

    const [items, total] = await Promise.all([
      this.productModel
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.productModel.countDocuments(filter).exec(),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      data: items,
      page,
      limit,
      total,
      pages,
    };
  }

  async findOne(id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('id inválido');
    }

    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('No encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('id inválido');
    }

    const updates: UpdateProductDto = { ...updateProductDto };

    if (updates.name && typeof updates.name === 'string') {
      updates.name = updates.name.trim();
    }

    const product = await this.productModel
      .findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!product) {
      throw new NotFoundException('No encontrado');
    }

    return product;
  }

  async remove(id: string): Promise<{ ok: boolean }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('id inválido');
    }

    const result = await this.productModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('No encontrado');
    }

    return { ok: true };
  }
}
