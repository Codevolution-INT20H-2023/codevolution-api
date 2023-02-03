import { Measure } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateIngredientDTO {
  @IsNotEmpty()
  name: string;

  @IsEnum(Measure)
  @IsNotEmpty()
  measure: Measure;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateIngredientDTO {
  @IsOptional()
  name?: string;

  @IsEnum(Measure)
  @IsOptional()
  measure?: Measure;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}