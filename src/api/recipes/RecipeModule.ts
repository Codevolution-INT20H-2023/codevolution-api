import { Module } from "@nestjs/common";
import { RecipeController } from "./RecipeController";
import { RecipeCategoryController } from "./recipe-categories/RecipeCategoryController";
import { RecipeService } from "./RecipeService";
import { RecipeCategoryService } from "./recipe-categories/RecipeCategoryService";
import { RecipeByIdPipe } from "./RecipeByIdPipe";
import { PrismaModule } from "../../database/PrismaModule";
import { IngredientModule } from "../ingredients/IngredientModule";

@Module({
  controllers: [RecipeController, RecipeCategoryController],
  providers: [
    RecipeService,
    RecipeCategoryService,
    RecipeByIdPipe,
  ],
  exports: [
    RecipeService,
    RecipeCategoryService,
  ],
  imports: [PrismaModule, IngredientModule],
})
export class RecipeModule {}