import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST /products
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  // GET /products?page=&limit=&q=&category=&sort=
  @Get()
  findAll(
    @Query() query: QueryProductsDto,
  ): Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  }> {
    return this.productsService.findAll(query);
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // PATCH /products/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ ok: boolean }> {
    return this.productsService.remove(id);
  }
}
