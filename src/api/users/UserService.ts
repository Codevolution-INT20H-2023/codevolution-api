import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { UserProductRepository } from "./UserProductRepository";
import { CreateProductDTO, UpdateProductDTO, UpdateProductsElementDTO } from "./UserDTOs";
import { RecipeService } from "../recipes/RecipeService";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userProductRepository: UserProductRepository,
    private recipeService: RecipeService,
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
    const products = await this.getProducts(userId);
    const recipes = await this.recipeService.getAll(true);
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