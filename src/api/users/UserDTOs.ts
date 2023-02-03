import { Measure } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDTO {
  @IsNumberString()
  @IsNotEmpty()
  amount: number;

  @IsEnum(Measure)
  @IsNotEmpty()
  measure: Measure;

  @IsUUID()
  @IsNotEmpty()
  ingredientId: string;
}

export class CreateProductsDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}

export class UpdateProductDTO {
  @IsNumberString()
  @IsOptional()
  amount?: number;

  @IsEnum(Measure)
  @IsOptional()
  measure?: Measure;
}