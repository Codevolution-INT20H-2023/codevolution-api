import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CreateIngredientData, UpdateIngredientData } from "./IngredientsDatas";

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

  get(id: string) {
    return this.prisma.ingredient.findUnique({
      where: {
        id,
      },
    });
  }

  getAll(query) {
    return this.prisma.ingredient.findMany({

    });
  }

  find(name: string) {
    return this.prisma.ingredient.findFirst({
      where: {
        name,
      },
    });
  }


}