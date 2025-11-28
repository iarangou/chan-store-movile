import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyProductsController } from './my-products.controller';
import { MyProductsService } from './my-products.service';
import {
    MyProduct,
    MyProductSchema,
} from './schemas/my-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MyProduct.name,
        schema: MyProductSchema,
      },
    ]),
  ],
  controllers: [MyProductsController],
  providers: [MyProductsService],
  exports: [MyProductsService],
})
export class MyProductsModule {}
