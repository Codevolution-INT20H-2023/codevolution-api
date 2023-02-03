import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "./RecipeRepository";
import { CreateProductDTO, CreateRecipeDTO, UpdateProductDTO, UpdateRecipeDTO } from "./RecipeDTOs";
import { RecipeProductRepository } from "./RecipeProductRepository";
import { IngredientService } from "../ingredients/IngredientService";

@Injectable()
export class RecipeService {
  constructor(
    private recipeRepository: RecipeRepository,
    private recipeProductRepository: RecipeProductRepository,
    private ingredientService: IngredientService,
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

  async get(id: string) {
    const recipe = await this.recipeRepository.get(id);
    const products = await this.getProducts(id);

    return {
      ...recipe,
      products,
    };
  }

  delete(id: string) {
    return this.recipeRepository.delete(id);
  }

  async getAll(query) {
    const results = [];
    const recipes = await this.recipeRepository.getAll(query);
    for (const recipe of recipes) {
      results.push(await this.get(recipe.id));
    }

    return results;
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

  async getProducts(recipeId: string) {
    const results = [];
    const products = await this.recipeProductRepository.getAll(recipeId);

    for (const product of products) {
      const ingredient = await this.ingredientService.get(product.ingredientId);
      results.push({
        ...ingredient,
        measure: product.measure,
        amount: product.amount,
      });
    }

    return results;
  }

}