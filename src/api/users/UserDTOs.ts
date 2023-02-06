import { IsNotEmpty, IsNumber,  IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDTO {
  @IsNumber({}, {
    message: 'The amount is not a number',
  })
  @IsNotEmpty({
    message: 'The amount is empty',
  })
  amount: number;

  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The categoryId is empty',
  })
  ingredientId: string;
}

export class CreateProductsDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}

export class UpdateProductDTO {
  @IsNumber({}, {
    message: 'The amount is not a number',
  })
  @IsNotEmpty({
    message: 'The amount is empty',
  })
  amount: number;
}

export class UpdateProductsElementDTO {
  @IsNumber({}, {
    message: 'The amount is not a number',
  })
  @IsNotEmpty({
    message: 'The amount is empty',
  })
  amount: number;

  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The categoryId is empty',
  })
  ingredientId: string;
}

export class UpdateProductsDTO {
  @ValidateNested({ each: true })
  @Type(() => UpdateProductsElementDTO)
  products: UpdateProductsElementDTO[];
}

export class DeleteProductsDTO {
  @IsUUID(4, {
    each: true,
    message: 'The ingredientId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The ingredients array is empty',
  })
  ingredients: string[];
}