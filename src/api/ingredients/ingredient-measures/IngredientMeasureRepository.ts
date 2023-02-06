import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../database/PrismaService";
import { CreateIngredientMeasureData, UpdateIngredientMeasureData } from "./IngredientMeasureDatas";
import { Measure } from "@prisma/client";

@Injectable()
export class IngredientMeasureRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(ingredientId: string, data: CreateIngredientMeasureData) {
    return this.prisma.ingredientMeasure.create({
      data: {
        ingredientId,
        ...data,
      },
      select: {
        measure: true,
        toStandard: true,
      },
    });
  }

  update(ingredientId: string, measure: Measure, data: UpdateIngredientMeasureData) {
    return this.prisma.ingredientMeasure.updateMany({
      where: {
        ingredientId,
        measure,
      },
      data,
    });
  }

  delete(ingredientId: string, measure: Measure) {
    return this.prisma.ingredientMeasure.deleteMany({
      where: {
        ingredientId,
        measure,
      },
    });
  }

  getMeasure(ingredientId: string, measure: Measure) {
    return this.prisma.ingredientMeasure.findFirst({
      where: {
        ingredientId,
        measure,
      },
      select: {
        toStandard: true,
      },
    });
  }

  getMeasures(ingredientId: string) {
    return this.prisma.ingredientMeasure.findMany({
      where: {
        ingredientId,
      },
      select: {
        measure: true,
        toStandard: true,
      },
    });
  }

  deleteAll(ingredientId: string) {
    return this.prisma.ingredientMeasure.deleteMany({
      where: {
        ingredientId,
      },
    });
  }
}