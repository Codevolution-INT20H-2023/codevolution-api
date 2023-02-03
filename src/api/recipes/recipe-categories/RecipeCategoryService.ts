import { Injectable } from "@nestjs/common";
import { CreateRecipeCategoryData, UpdateRecipeCategoryData } from "../RecipeDatas";
import { RecipeCategoryRepository } from "./RecipeCategoryRepository";

@Injectable()
export class RecipeCategoryService {
  constructor(
    private recipeCategoryRepository: RecipeCategoryRepository,
  ) {}

  create(data: CreateRecipeCategoryData) {
    return this.recipeCategoryRepository.create(data);
  }

  get(id: string) {
    return this.recipeCategoryRepository.get(id);
  }

  async delete(id: string) {
    await this.recipeCategoryRepository.delete(id);
  }

  getAll(query) {
    return this.recipeCategoryRepository.getAll(query);
  }

  async update(id: string, data: UpdateRecipeCategoryData) {
    await this.recipeCategoryRepository.update(id, data);
  }

}