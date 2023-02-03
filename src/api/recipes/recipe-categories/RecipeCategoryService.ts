import { Injectable } from "@nestjs/common";
import { CreateRecipeCategoryData, UpdateRecipeCategoryData } from "../RecipeDatas";

@Injectable()
export class RecipeCategoryService {
  constructor(
    private recipeCategoryService: RecipeCategoryService,
  ) {}

  create(data: CreateRecipeCategoryData) {
    return this.recipeCategoryService.create(data);
  }

  get(id: string) {
    return this.recipeCategoryService.get(id);
  }

  async delete(id: string) {
    await this.recipeCategoryService.delete(id);
  }

  getAll(query) {
    return this.recipeCategoryService.getAll(query);
  }

  async update(id: string, data: UpdateRecipeCategoryData) {
    await this.recipeCategoryService.update(id, data);
  }

}