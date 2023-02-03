import { Module } from "@nestjs/common";
import { IngredientCategoryController } from "./ingredient-categories/IngredientCategoryController";
import { IngredientController } from "./IngredientController";
import { IngredientService } from "./IngredientService";
import { IngredientCategoryService } from "./ingredient-categories/IngredientCategoryService";
import { PrismaModule } from "../../database/PrismaModule";

@Module({
  controllers: [IngredientCategoryController, IngredientController],
  providers: [
    IngredientService,
    IngredientCategoryService,
  ],
  exports: [
    IngredientService,
    IngredientCategoryService,
  ],
  imports: [PrismaModule],
})
export class IngredientModule {}