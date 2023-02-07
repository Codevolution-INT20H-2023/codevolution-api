import { Module } from "@nestjs/common";
import { IngredientCategoryController } from "./ingredient-categories/IngredientCategoryController";
import { IngredientController } from "./IngredientController";
import { IngredientService } from "./IngredientService";
import { IngredientCategoryService } from "./ingredient-categories/IngredientCategoryService";
import { PrismaModule } from "../../database/PrismaModule";
import { IngredientByIdPipe } from "./IngredientByIdPipe";
import { IngredientMeasureService } from "./ingredient-measures/IngredientMeasureService";
import { GlobalMeasureModule } from "../global-measures/GlobalMeasureModule";

@Module({
  controllers: [IngredientCategoryController, IngredientController],
  providers: [
    IngredientService,
    IngredientCategoryService,
    IngredientMeasureService,
    IngredientByIdPipe,
  ],
  exports: [
    IngredientService,
    IngredientCategoryService,
    IngredientMeasureService,
    IngredientByIdPipe,
  ],
  imports: [PrismaModule, GlobalMeasureModule],
})
export class IngredientModule {}