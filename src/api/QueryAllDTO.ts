import { IsBoolean, IsBooleanString, IsOptional, ValidationError } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

export class QueryAllDTO {
  @IsOptional()
  search?: string;
}

export function transformToBoolean({ value }: TransformFnParams) {
  if (value === 'true') return true;
  else if (value === 'false') return false;
  else throw new BadRequestException('The value is not a boolean');
}

export class QueryIngredientsDTO extends QueryAllDTO {
  @Transform(transformToBoolean)
  @IsOptional()
  measures?: boolean;

  @Transform(transformToBoolean)
  @IsOptional()
  category?: boolean;
}