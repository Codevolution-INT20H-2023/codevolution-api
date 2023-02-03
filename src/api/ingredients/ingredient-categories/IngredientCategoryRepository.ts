import { PrismaService } from "../../../database/PrismaService";
import { CreateIngredientCategoryData, UpdateIngredientCategoryData } from "./IngredientCategoryDatas";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IngredientCategoryRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateIngredientCategoryData) {
    return this.prisma.ingredientCategory.create({
      data,
    });
  }

  update(id: string, data: UpdateIngredientCategoryData) {
    return this.prisma.ingredientCategory.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.ingredientCategory.delete({
      where: {
        id,
      },
    });
  }

  get(id: string) {
    return this.prisma.ingredientCategory.findUnique({
      where: {
        id,
      },
    });
  }

  getAll(query) {
    return this.prisma.ingredientCategory.findMany({

    });
  }

  find(name: string) {
    return this.prisma.ingredientCategory.findFirst({
      where: {
        name,
      },
    });
  }


}