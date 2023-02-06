import { Measure } from "@prisma/client";
import {
  IsEnum,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsUUID,
  Matches, MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export const UKRAINIAN_REGEX = /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-' ]+$/g;

export class IngredientMeasureDTO {
  @IsEnum(Measure, {
    message: 'The measure is not an enum',
  })
  @IsNotEmpty({
    message: 'The measure is empty',
  })
  measure: Measure;

  @IsNumber({}, {
    message: 'The toStandard is not a number',
  })
  @IsNotEmpty({
    message: 'The toStandard is empty',
  })
  toStandard: number;
}

export class CreateIngredientMeasuresDTO {
  @ValidateNested({ each: true })
  @Type(() => IngredientMeasureDTO)
  @IsOptional()
  measures?: IngredientMeasureDTO[];
}

export class CreateIngredientDTO extends CreateIngredientMeasuresDTO{

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

  @IsEnum(Measure, {
    message: 'The standard is not an enum',
  })
  @IsNotEmpty({
    message: 'The standard is empty',
  })
  standard: Measure;

  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsNotEmpty({
    message: 'The categoryId is empty',
  })
  categoryId: string;
}

export class UpdateIngredientMeasureDTO {
  @IsNumber({}, {
    message: 'The toStandard is not a number',
  })
  @IsNotEmpty({
    message: 'The toStandard is empty',
  })
  toStandard: number;
}

export class UpdateIngredientMeasuresDTO {
  @ValidateNested({ each: true })
  @Type(() => IngredientMeasureDTO)
  @IsNotEmpty({
    message: 'The measures is empty',
  })
  measures: IngredientMeasureDTO[];
}

export class UpdateIngredientDTO {

  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(30, {
    message: 'The maximum length of name is 30',
  })
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @IsOptional()
  name?: string;

  @IsEnum(Measure, {
    message: 'The measure is not an enum',
  })
  @IsOptional()
  standard?: Measure;

  @IsUUID(4, {
    message: 'The categoryId is not an UUIDv4',
  })
  @IsOptional()
  categoryId?: string;

  @ValidateNested({ each: true })
  @Type(() => IngredientMeasureDTO)
  @IsOptional()
  measures?: IngredientMeasureDTO[];
}

export class DeleteMeasuresDTO {
  @IsEnum(Measure, {
    each: true,
    message: 'The measure is not an enum',
  })
  measures: Measure[];
}