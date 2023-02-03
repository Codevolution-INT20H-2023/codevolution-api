import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CreateProductData, UpdateProductData } from "./RecipeDatas";

@Injectable()
export class RecipeProductRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(recipeId: string, data: CreateProductData) {
    return this.prisma.recipeProduct.create({
      data: {
        recipeId,
        ...data,
      },
    });
  }

  async delete(recipeId: string, ingredientId: string) {
    return this.prisma.recipeProduct.deleteMany({
      where: {
        recipeId,
        ingredientId,
      },
    });
  }

  async update(recipeId, ingredientId, data: UpdateProductData) {
    return this.prisma.recipeProduct.updateMany({
      where: {
        recipeId,
        ingredientId,
      },
      data,
    });
  }

  async getAll(recipeId: string) {
    return this.prisma.recipeProduct.findMany({
      where: {
        recipeId,
      },
    });
  }
}