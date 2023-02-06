import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/AuthModule";
import { RecipeModule } from "./recipes/RecipeModule";
import { IngredientModule } from "./ingredients/IngredientModule";
import { UserModule } from "./users/UserModule";
import { GlobalMeasureModule } from "./global-measures/GlobalMeasureModule";

@Module({
  imports: [
    AuthModule,
    RecipeModule,
    IngredientModule,
    UserModule,
    GlobalMeasureModule,
  ],
})
export class ApiModule {}