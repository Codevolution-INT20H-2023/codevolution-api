import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Measure } from "@prisma/client";

export class CreateProductDTO {
  @IsUUID()
  @IsNotEmpty()
  ingredientId: string;

  @IsNumberString()
  @IsNotEmpty()
  amount: number;

  @IsEnum(Measure)
  @IsNotEmpty()
  measure: Measure;
}

export class CreateProductsDTO {

  @ValidateNested({ each: true })
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}


export class CreateRecipeDTO extends CreateProductsDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  difficulty: number;

  @IsNotEmpty()
  categoryId: string;
}

export class UpdateRecipeDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsOptional()
  difficulty?: number;

  @IsOptional()
  categoryId?: string;
}

export class UpdateRecipeCategoryDTO {
  @IsNotEmpty()
  name: string;
}

export class CreateRecipeCategoryDTO {
  @IsNotEmpty()
  name: string;
}

export class UpdateProductDTO {
  @IsNumberString()
  @IsOptional()
  amount?: number;

  @IsEnum(Measure)
  @IsOptional()
  measure?: Measure;
}