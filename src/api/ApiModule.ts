import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/AuthModule";
import { RecipeModule } from "./recipes/RecipeModule";
import { IngredientModule } from "./ingredients/IngredientModule";
import { UserModule } from "./users/UserModule";

@Module({
  imports: [
    AuthModule,
    RecipeModule,
    IngredientModule,
    UserModule,
  ],
})
export class ApiModule {}