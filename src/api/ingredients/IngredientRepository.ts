import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CreateIngredientData, UpdateIngredientData } from "./IngredientsDatas";
import { QueryAllDTO } from "../QueryAllDTO";

@Injectable()
export class IngredientRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateIngredientData) {
    return this.prisma.ingredient.create({
      data,
    });
  }

  update(id: string, data: UpdateIngredientData) {
    return this.prisma.ingredient.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.ingredient.delete({
      where: {
        id,
      },
    });
  }

  get(id: string, { includeCategory = false, includeMeasures = false } = {}) {
    return this.prisma.ingredient.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        standard: true,
        categoryId: !includeCategory,
        category: includeCategory,
        ingredientMeasures: includeMeasures,
      },
    });
  }

  getAll(query: QueryAllDTO, { includeMeasures = false }) {
    return this.prisma.ingredient.findMany({
      where: {
        name: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        standard: true,
        category: true,
        ingredientMeasures: includeMeasures ? {
          select: {
            measure: true,
            toStandard: true,
          },
        } : false,
      },
    });
  }

  find(name: string) {
    return this.prisma.ingredient.findFirst({
      where: {
        name,
      },
    });
  }


  async getMeasures(id: string) {
    const ingredients = await this.prisma.ingredient.findUnique({
      where: {
        id,
      },
      select: {
        standard: true,
        ingredientMeasures: {
          select: {
            measure: true,
            toStandard: true,
          },
        },
      },
    });
    ingredients.ingredientMeasures.push({ measure: ingredients.standard, toStandard: 1 });
    return ingredients.ingredientMeasures;
  }

}