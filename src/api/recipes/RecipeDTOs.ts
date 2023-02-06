import {
  IsEnum,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsUUID, Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Measure } from "@prisma/client";
import { UKRAINIAN_REGEX } from "../ingredients/IngredientDTOs";

export class CreateProductDTO {
  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The categoryId is empty',
  })
  ingredientId: string;

  @IsNumber({}, {
    message: 'The amount is not a number',
  })
  @IsNotEmpty({
    message: 'The amount is empty',
  })
  amount: number;

  @IsEnum(Measure, {
    message: 'The measure is not an enum',
  })
  @IsNotEmpty({
    message: 'The measure is empty',
  })
  measure: Measure;
}

export class CreateProductsDTO {

  @ValidateNested({ each: true })
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}


export class CreateRecipeDTO extends CreateProductsDTO {
  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(50, {
    message: 'The maximum length of name is 50',
  })
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @IsNotEmpty({
    message: 'The name is empty',
  })
  name: string;

  @MinLength(2, {
    message: 'The description length of name is 2',
  })
  @MaxLength(4000, {
    message: 'The description length of name is 4000',
  })
  @IsNotEmpty({
    message: 'The description is empty',
  })
  description: string;

  @IsNumber({}, {
    message: 'The difficulty is not a number',
  })
  @IsNotEmpty({
    message: 'The difficulty is empty',
  })
  difficulty: number;

  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The categoryId is empty',
  })
  categoryId: string;
}

export class UpdateRecipeDTO {
  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(50, {
    message: 'The maximum length of name is 50',
  })
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @IsOptional()
  name?: string;

  @MinLength(2, {
    message: 'The description length of name is 2',
  })
  @MaxLength(4000, {
    message: 'The description length of name is 4000',
  })
  @IsOptional()
  description?: string;

  @IsNumber({}, {
    message: 'The difficulty is not a number',
  })
  @IsOptional()
  difficulty?: number;

  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsOptional()
  categoryId?: string;
}

export class UpdateRecipeCategoryDTO {
  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(30, {
    message: 'The maximum length of name is 30',
  })
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @IsNotEmpty({
    message: 'The name is empty',
  })
  name: string;
}

export class CreateRecipeCategoryDTO {
  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(30, {
    message: 'The maximum length of name is 30',
  })
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @IsNotEmpty({
    message: 'The name is empty',
  })
  name: string;
}

export class UpdateProductDTO {
  @IsNumber({}, {
    message: 'The amount is not a number',
  })
  @IsOptional()
  amount?: number;

  @IsEnum(Measure, {
    message: 'The measure is not an enum',
  })
  @IsOptional()
  measure?: Measure;
}

export class UpdateProductsElementDTO {
  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The categoryId is empty',
  })
  ingredientId: string;

  @IsNumber({}, {
    message: 'The amount is not a number',
  })
  @IsOptional()
  amount?: number;

  @IsEnum(Measure, {
    message: 'The measure is not an enum',
  })
  @IsOptional()
  measure?: Measure;
}

export class UpdateProductsDTO {
  @ValidateNested({ each: true })
  @Type(() => (UpdateProductsElementDTO))
  @IsNotEmpty()
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