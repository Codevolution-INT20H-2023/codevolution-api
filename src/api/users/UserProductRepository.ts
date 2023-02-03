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
    });
  }

  get(userId, ingredientId) {
    return this.prisma.userProduct.findFirst({
      where: {
        userId,
        ingredientId,
      },
    });
  }

}