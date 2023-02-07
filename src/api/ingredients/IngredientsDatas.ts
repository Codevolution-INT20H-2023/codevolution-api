import { Measure } from "@prisma/client";

export class CreateIngredientData {
  name: string;
  standard: Measure;
  categoryId: string;
}

export class UpdateIngredientData {
  name?: string;
  standard?: Measure;
  categoryId?: string;
}