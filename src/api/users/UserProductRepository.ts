import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CreateProductData, UpdateProductData } from "./UserDatas";

@Injectable()
export class UserProductRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(userId: string, data: CreateProductData) {
    return this.prisma.userProduct.create({
      data: {
        userId,
        ...data,
      },
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
      },
    });
  }

  update(userId: string, ingredientId: string, data: UpdateProductData) {
    return this.prisma.userProduct.updateMany({
      where: {
        userId,
        ingredientId,
      },
      data,
    });
  }

  getAll(userId: string) {
    return this.prisma.userProduct.findMany({
      where: {
        userId,
      },
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
      },
    });
  }

  get(userId, ingredientId) {
    return this.prisma.userProduct.findFirst({
      where: {
        userId,
        ingredientId,
      },
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
      },
    });
  }

  delete(userId: string, ingredientId: string) {
    return this.prisma.userProduct.deleteMany({
      where: {
        userId,
        ingredientId,
      },
    });
  }

}