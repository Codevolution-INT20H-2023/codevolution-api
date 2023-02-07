import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CreateRecipeData, UpdateRecipeData } from "./RecipeDatas";

@Injectable()
export class RecipeRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateRecipeData) {
    return this.prisma.recipe.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        difficulty: true,
        category: true,
      },
    });
  }

  getAll(includeProducts = false) {
    return this.prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        difficulty: true,
        description: true,
        products: !includeProducts ? false : {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                standard: true,
                category: true,
              },
            },
            amount: true,
            measure: true,
          },
        },
      },
    });
  }

  get(id: string, includeProducts = false) {
    return this.prisma.recipe.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        category: true,
        difficulty: true,
        description: true,
        products: !includeProducts ? false : {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
            amount: true,
            measure: true,
          },
        },
      },
    });
  }

  update(id: string, data: UpdateRecipeData) {
    return this.prisma.recipe.update({
      where: {
        id,
      },
      data,
    });
  }

  async getCategory(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    return recipe.category;
  }

  delete(id: string) {
    return this.prisma.recipe.delete({
      where: {
        id,
      },
    });
  }
}