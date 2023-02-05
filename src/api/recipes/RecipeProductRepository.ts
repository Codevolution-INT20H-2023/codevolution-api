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
      select: {
        ingredient: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        measure: true,
        amount: true,
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
      select: {
        ingredient: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        measure: true,
        amount: true,
      },
    });
  }

  async get(recipeId: string, ingredientId: string) {
    return this.prisma.recipeProduct.findFirst({
      where: {
        recipeId,
        ingredientId,
      },
      select: {
        ingredient: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        measure: true,
        amount: true,
      },
    });
  }
}