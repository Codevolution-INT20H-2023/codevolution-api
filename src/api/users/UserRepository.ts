import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserData } from "./UserDatas";

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateUserData) {
    return this.prisma.user.create({
      data,
    });
  }

  find(email: string, password: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
  }

  get(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
