import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "./RecipeRepository";
import { CreateProductDTO, CreateRecipeDTO, UpdateProductDTO, UpdateRecipeDTO } from "./RecipeDTOs";
import { RecipeProductRepository } from "./RecipeProductRepository";

@Injectable()
export class RecipeService {
  constructor(
    private recipeRepository: RecipeRepository,
    private recipeProductRepository: RecipeProductRepository,
  ) {}

  async create({ products, ...data }: CreateRecipeDTO) {
    const recipe = await this.recipeRepository.create(data);
    const dbProducts = await this.createProducts(recipe.id, products);

    return {
      ...recipe,
      products: dbProducts,
    };
  }

  async createProduct(recipeId: string, data: CreateProductDTO) {
    return this.recipeProductRepository.create(recipeId, data);
  }

  get(id: string) {
    return this.recipeRepository.get(id);
  }

  delete(id: string) {
    return this.recipeRepository.delete(id);
  }

  getAll(query) {
    return this.recipeRepository.getAll(query);
  }

  update(id: string, data: UpdateRecipeDTO) {
    return this.recipeRepository.update(id, data);
  }

  async createProducts(recipeId: string, products: CreateProductDTO[]) {
    const results = [];

    for (const product of products) {
      const dbProduct = await this.createProduct(recipeId, product);
      results.push(dbProduct);
    }

    return results;
  }

  async deleteProduct(recipeId: string, ingredientId: string) {
    await this.recipeProductRepository.delete(recipeId, ingredientId);
  }

  async updateProduct(recipeId: string, ingredientId: string, data: UpdateProductDTO) {
    await this.recipeProductRepository.update(recipeId, ingredientId, data);
  }

}