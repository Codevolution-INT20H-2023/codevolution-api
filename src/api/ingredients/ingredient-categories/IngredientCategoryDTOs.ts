import { IsNotEmpty } from "class-validator";

export class UpdateIngredientCategoryDTO {
  @IsNotEmpty()
  name: string;
}

export class CreateIngredientCategoryDTO {
  @IsNotEmpty()
  name: string;
}