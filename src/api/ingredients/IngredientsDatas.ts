import { Measure } from "@prisma/client";

export class CreateIngredientData {
  name: string;
  measure: Measure;
  categoryId: string;
}

export class UpdateIngredientData {
  name?: string;
  measure?: Measure;
  categoryId?: string;
}