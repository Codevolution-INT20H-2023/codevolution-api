import { Module } from "@nestjs/common";
import { UserController } from "./UserController";
import { UserService } from "./UserService";
import { PrismaModule } from "../../database/PrismaModule";
import { RecipeModule } from "../recipes/RecipeModule";
import { IngredientModule } from "../ingredients/IngredientModule";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule, RecipeModule, IngredientModule],
})
export class UserModule {}