import { Module } from "@nestjs/common";
import { AuthService } from "./AuthService";
import { AuthController } from "./AuthController";
import { PrismaModule } from "../../database/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/ConfigModule";
import { SecurityConfigService } from "../../config/SecurityConfigService";
import { LocalGuard } from "../../security/LocalGuard";
import { JwtGuard } from "../../security/JwtGuard";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalGuard, JwtGuard],
  exports: [AuthService],
  imports: [PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: configService.jwtTtl,
        },
      }),
    })],
})
export class AuthModule {}