import { Module } from "@nestjs/common";
import { GlobalMeasureController } from "./GlobalMeasureController";
import { GlobalMeasureService } from "./GlobalMeasureService";
import { PrismaModule } from "../../database/PrismaModule";

@Module({
  controllers: [GlobalMeasureController],
  providers: [GlobalMeasureService],
  exports: [GlobalMeasureService],
  imports: [PrismaModule],
})
export class GlobalMeasureModule {}