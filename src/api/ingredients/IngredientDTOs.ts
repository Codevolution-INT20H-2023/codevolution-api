import { Measure } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateIngredientDTO {
  @IsNotEmpty()
  name: string;

  @IsEnum(Measure)
  @IsNotEmpty()
  standard: Measure;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateIngredientDTO {
  @IsOptional()
  name?: string;

  @IsEnum(Measure)
  @IsOptional()
  standard?: Measure;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}