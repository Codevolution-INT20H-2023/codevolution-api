import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "./RecipeRepository";
import {
  CreateProductDTO,
  CreateRecipeDTO,
  UpdateProductDTO,
  UpdateProductsElementDTO,
  UpdateRecipeDTO,
} from "./RecipeDTOs";
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

  get(id: string, includeProducts = false) {
    return this.recipeRepository.get(id, includeProducts);
  }

  delete(id: string) {
    return this.recipeRepository.delete(id);
  }

  async getAll(includeProducts = false) {
    return this.recipeRepository.getAll(includeProducts);
  }

  async update(id: string, { products, ...data }: UpdateRecipeDTO) {
    await this.recipeRepository.update(id, data);
    await this.recipeProductRepository.deleteAll(id);

    for (const product of products) {
      await this.recipeProductRepository.create(id, product);
    }
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

  async getProducts(recipeId: string) {
    return this.recipeProductRepository.getAll(recipeId);
  }

  async updateProducts(recipeId: string, products: UpdateProductsElementDTO[]) {
    for (const { ingredientId, ...data } of products) {
      await this.updateProduct(recipeId, ingredientId, data);
    }
  }

  async deleteProducts(recipeId: string, ingredients: string[]) {
    for (const ingredientId of ingredients) {
      await this.deleteProduct(recipeId, ingredientId);
    }
  }

  getProduct(recipeId, ingredientId) {
    return this.recipeProductRepository.get(recipeId, ingredientId);
  }
}