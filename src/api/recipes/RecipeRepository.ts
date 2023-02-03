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
    });
  }

  getAll(query) {
    return this.prisma.recipe.findMany({

    });
  }

  get(id: string) {
    return this.prisma.recipe.findUnique({
      where: {
        id,
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
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}