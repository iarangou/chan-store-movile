import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMyProductDto } from './dto/create-my-product.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateMyProductDto } from './dto/update-my-product.dto';
import { MyProductsService } from './my-products.service';

type MyProductCreateResponse = {
  ok: boolean;
  data: any; // puedes reemplazar 'any' por un tipo más estricto después
};

@Controller('my-products')
@UseGuards(JwtAuthGuard)
export class MyProductsController {
  constructor(private readonly myProductsService: MyProductsService) {}

  private getUserIdFromRequest(req: Request): string {
    const user: any = (req as any).user;
    const userId = user?.sub ?? user?.id ?? user?._id;

    if (!userId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return String(userId);
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.myProductsService.findAllByUser(userId, paginationQuery);
  }

  @Post()
  async create(
      @Req() req: Request,
      @Body() createDto: CreateMyProductDto,
  ): Promise<MyProductCreateResponse> {
      const userId = this.getUserIdFromRequest(req);
      const doc = await this.myProductsService.create(createDto, userId);

      const plain = doc.toObject ? doc.toObject() : doc;
      return {
        ok: true,
        data: {
            ...plain,
            _id: String(plain._id ?? (doc as any)._id),
        },
      };
  }  


  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = this.getUserIdFromRequest(req);
    return this.myProductsService.findOneByUser(id, userId);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateDto: UpdateMyProductDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    const doc = await this.myProductsService.updateForUser(
      id,
      updateDto,
      userId,
    );

    return {
      ok: true,
      data: doc,
    };
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const userId = this.getUserIdFromRequest(req);
    return this.myProductsService.removeForUser(id, userId);
  }
}
