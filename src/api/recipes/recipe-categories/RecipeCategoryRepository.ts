import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";
import { CreateRecipeCategoryData, UpdateRecipeCategoryData } from "../RecipeDatas";
import { QueryAllDTO } from "../../QueryAllDTO";

@Injectable()
export class RecipeCategoryRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateRecipeCategoryData) {
    return this.prisma.recipeCategory.create({
      data,
    });
  }

  update(id: string, data: UpdateRecipeCategoryData) {
    return this.prisma.recipeCategory.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.recipeCategory.delete({
      where: {
        id,
      },
    });
  }

  get(id: string) {
    return this.prisma.recipeCategory.findUnique({
      where: {
        id,
      },
    });
  }

  getAll(query: QueryAllDTO) {
    return this.prisma.recipeCategory.findMany({
      where: {
        name: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
    });
  }

  async getRecipes(id: string) {
    const category = await this.prisma.recipeCategory.findUnique({
      where: {
        id,
      },
      include: {
        recipes: true,
      },
    });

    return category.recipes;
  }

  find(name: string) {
    return this.prisma.recipeCategory.findFirst({
      where: {
        name,
      },
    });
  }
}