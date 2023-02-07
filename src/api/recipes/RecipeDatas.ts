import { Measure } from "@prisma/client";

export class CreateRecipeData {
  name: string;
  description: string;
  difficulty: number;
  categoryId: string;
}

export class UpdateRecipeData {
  name?: string;
  description?: string;
  difficulty?: number;
  categoryId?: string;
}

export class CreateRecipeCategoryData {
  name: string;
}

export class UpdateRecipeCategoryData {
  name: string;
}

export class CreateProductData {
  amount: number;
  measure: Measure;
  ingredientId: string;
}

export class UpdateProductData {
  amount?: number;
  measure?: Measure;
}