import { Injectable } from "@nestjs/common";
import { IngredientCategoryRepository } from "./IngredientCategoryRepository";
import { CreateIngredientDTO, UpdateIngredientDTO } from "../IngredientDTOs";
import { CreateIngredientCategoryDTO, UpdateIngredientCategoryDTO } from "./IngredientCategoryDTOs";

@Injectable()
export class IngredientCategoryService {
  constructor(
    private ingredientCategoryRepository: IngredientCategoryRepository,
  ) {}

  create(data: CreateIngredientCategoryDTO) {
    return this.ingredientCategoryRepository.create(data);
  }

  get(id: string) {
    return this.ingredientCategoryRepository.get(id);
  }

  async delete(id: string) {
    await this.ingredientCategoryRepository.delete(id);
  }

  getAll(query) {
    return this.ingredientCategoryRepository.getAll(query);
  }

  async update(id: string, data: UpdateIngredientCategoryDTO) {
    await this.ingredientCategoryRepository.update(id, data);
  }


}