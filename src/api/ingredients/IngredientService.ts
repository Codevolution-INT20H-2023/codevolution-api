import { Injectable } from "@nestjs/common";
import { IngredientRepository } from "./IngredientRepository";
import { CreateIngredientDTO, UpdateIngredientDTO } from "./IngredientDTOs";

@Injectable()
export class IngredientService {
  constructor(
    private ingredientRepository: IngredientRepository,
  ) {}

  create(data: CreateIngredientDTO) {
    return this.ingredientRepository.create(data);
  }

  get(id: string) {
    return this.ingredientRepository.get(id);
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