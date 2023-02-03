import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";

@Injectable()
export class UserProductRepository {
  constructor(
    private prisma: PrismaService,
  ) {}


}