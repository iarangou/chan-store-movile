import { PartialType } from '@nestjs/mapped-types';
import { CreateMyProductDto } from './create-my-product.dto';

export class UpdateMyProductDto extends PartialType(CreateMyProductDto) {}
