import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { Measure } from "@prisma/client";
import { GlobalMeasureData } from "./GlobalMeasureDatas";

@Injectable()
export class GlobalMeasureRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  get(from: Measure, to: Measure) {
    return this.prisma.defaultMeasures.findFirst({
      where: {
        from,
        to,
      },
    });
  }

  create(data: GlobalMeasureData) {
    return this.prisma.defaultMeasures.create({
      data,
    });
  }

  update({ from, to, ...data }: GlobalMeasureData) {
    return this.prisma.defaultMeasures.updateMany({
      where: {
        from,
        to,
      },
      data,
    });
  }

  delete(from: Measure, to: Measure) {
    return this.prisma.defaultMeasures.deleteMany({
      where: {
        from,
        to,
      },
    });
  }
}