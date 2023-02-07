import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { UserProductRepository } from "./UserProductRepository";
import { CreateProductDTO, UpdateProductDTO, UpdateProductsElementDTO } from "./UserDTOs";
import { RecipeService } from "../recipes/RecipeService";
import { IngredientMeasureService } from "../ingredients/ingredient-measures/IngredientMeasureService";
import { Ingredient, IngredientCategory, Measure, RecipeProduct, UserProduct } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userProductRepository: UserProductRepository,
    private recipeService: RecipeService,
    private ingredientMeasureService: IngredientMeasureService,
  ) {}


  createProduct(userId: string, product: CreateProductDTO) {
    return this.userProductRepository.create(userId, product);
  }

  async createProducts(userId: string, products: CreateProductDTO[]) {
    const results = [];

    for (const product of products) {
      const dbProduct = await this.createProduct(userId, product);
      results.push(dbProduct);
    }

    return results;
  }

  getProduct(userId: string, ingredientId) {
    return this.userProductRepository.get(userId, ingredientId);
  }

  getProducts(userId: string) {
    return this.userProductRepository.getAll(userId);
  }

  async getAvailableRecipes(userId: string) {
    const userProducts = await this.getProducts(userId);
    const recipes = await this.recipeService.getAll(true);

    const results = [];

    for (const { products: recipeProducts, ...recipe } of recipes) {
      const isGood = await this.checkProducts(userProducts as any, recipeProducts as any);
      if (isGood) results.push(recipe);
    }

    return results;
  }

  async checkProducts(
    userProducts: any,
    recipeProducts: any,
  ) {
    for (const recipeProduct of recipeProducts) {
      const userProduct = userProducts.find((p) => p.ingredient.id === recipeProduct.ingredient.id);

      let standardAmount;
      if (recipeProduct.ingredient.standard === recipeProduct.measure) {
        standardAmount = recipeProduct.amount;
      } else {
        standardAmount = await this.ingredientMeasureService.toStandard((recipeProduct as any).ingredient, recipeProduct.measure, recipeProduct.amount);
      }

      if (!userProduct || userProduct.amount < standardAmount) return false;
    }

    return true;
  }

  async updateProduct(userId: string, ingredientId: string, data: UpdateProductDTO) {
    await this.userProductRepository.update(userId, ingredientId, data);
  }

  async updateProducts(userId: string, products: UpdateProductsElementDTO[]) {
    for (const { ingredientId, amount } of products) {
      await this.updateProduct(userId, ingredientId, { amount });
    }
  }

  async deleteProduct(userId: string, ingredientId: string) {
    await this.userProductRepository.delete(userId, ingredientId);
  }

  async deleteProducts(userId: string, ingredients: string[]) {
    for (const ingredientId of ingredients) {
      await this.userProductRepository.delete(userId, ingredientId);
    }
  }
}