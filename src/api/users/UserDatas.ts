import { Measure } from "@prisma/client";

export class CreateUserData {
  email: string;
  password: string;
}

export class CreateProductData {
  amount: number;
  ingredientId: string;
}

export class UpdateProductData {
  amount: number;
}