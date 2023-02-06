import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { UserRepository } from '../api/users/UserRepository';
import { RecipeRepository } from "../api/recipes/RecipeRepository";
import { RecipeCategoryRepository } from "../api/recipes/recipe-categories/RecipeCategoryRepository";
import { IngredientCategoryRepository } from "../api/ingredients/ingredient-categories/IngredientCategoryRepository";
import { IngredientRepository } from "../api/ingredients/IngredientRepository";
import { RecipeProductRepository } from "../api/recipes/RecipeProductRepository";
import { IngredientMeasureRepository } from "../api/ingredients/ingredient-measures/IngredientMeasureRepository";
import { UserProductRepository } from "../api/users/UserProductRepository";
import { GlobalMeasureRepository } from "../api/global-measures/GlobalMeasureRepository";

@Module({
  providers: [
    PrismaService,
    UserRepository,
    RecipeRepository,
    RecipeCategoryRepository,
    RecipeProductRepository,
    IngredientCategoryRepository,
    IngredientMeasureRepository,
    IngredientRepository,
    UserProductRepository,
    GlobalMeasureRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    RecipeRepository,
    RecipeCategoryRepository,
    RecipeProductRepository,
    IngredientCategoryRepository,
    IngredientMeasureRepository,
    IngredientRepository,
    UserProductRepository,
    GlobalMeasureRepository,
  ],
})
export class PrismaModule {}
