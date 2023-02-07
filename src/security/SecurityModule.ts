import { Module } from "@nestjs/common";
import { PrismaModule } from "../database/PrismaModule";
import { JwtGuard } from "./JwtGuard";

@Module({
  providers: [JwtGuard],
  exports: [JwtGuard],
  imports: [PrismaModule],
})
export class SecurityModule {}