import { Injectable } from "@nestjs/common";
import { IngredientRepository } from "./IngredientRepository";
import { CreateIngredientDTO, UpdateIngredientDTO } from "./IngredientDTOs";
import { IngredientCategoryRepository } from "./ingredient-categories/IngredientCategoryRepository";

@Injectable()
export class IngredientService {
  constructor(
    private ingredientRepository: IngredientRepository,
    private ingredientCategoryRepository: IngredientCategoryRepository,
  ) {}

  create(data: CreateIngredientDTO) {
    return this.ingredientRepository.create(data);
  }

  async get(id: string) {
    const ingredient = await this.ingredientRepository.get(id);
    const category = await this.ingredientCategoryRepository.get(ingredient.categoryId);
    return {
      id: ingredient.id,
      name: ingredient.name,
      category,
    };
  }

  async delete(id: string) {
    await this.ingredientRepository.delete(id);
  }

  getAll(query) {
    return this.ingredientRepository.getAll(query);
  }

  async update(id: string, data: UpdateIngredientDTO) {
    await this.ingredientRepository.update(id, data);
  }

}