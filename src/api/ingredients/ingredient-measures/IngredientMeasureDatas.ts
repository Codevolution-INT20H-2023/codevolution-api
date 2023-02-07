import { Measure } from "@prisma/client";

export class CreateIngredientMeasureData {
  measure: Measure;
  toStandard: number;
}

export class UpdateIngredientMeasureData {
  toStandard: number;
}