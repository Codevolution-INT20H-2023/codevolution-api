import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { UserProductRepository } from "./UserProductRepository";
import { CreateProductDTO, UpdateProductDTO } from "./UserDTOs";
import { IngredientService } from "../ingredients/IngredientService";
import { RecipeService } from "../recipes/RecipeService";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userProductRepository: UserProductRepository,
    private ingredientService: IngredientService,
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

  updateProduct(userId: string, ingredientId: string, data: UpdateProductDTO) {
    return this.userProductRepository.update(userId, ingredientId, data);
  }

  async getProducts(userId: string) {
    const results = [];
    const products = await this.userProductRepository.getAll(userId);
    for (const product of products) {
      const ingredient = await this.ingredientService.get(product.ingredientId);
      results.push({
        amount: product.amount,
        ...ingredient,
      });
    }
    return results;
  }

  async getAvailableRecipes(userId: string) {
    const products = await this.getProducts(userId);
    const recipes = await this.recipeService.getAll(true);
  }
}