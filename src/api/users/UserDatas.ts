import { Measure } from "@prisma/client";

export class CreateUserData {
  email: string;
  password: string;
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