import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { UserRepository } from '../api/users/UserRepository';
import { RecipeRepository } from "../api/recipes/RecipeRepository";
import { RecipeCategoryRepository } from "../api/recipes/recipe-categories/RecipeCategoryRepository";
import { IngredientCategoryRepository } from "../api/ingredients/ingredient-categories/IngredientCategoryRepository";
import { IngredientRepository } from "../api/ingredients/IngredientRepository";

@Module({
  providers: [
    PrismaService,
    UserRepository,
    RecipeRepository,
    RecipeCategoryRepository,
    IngredientCategoryRepository,
    IngredientRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    RecipeRepository,
    RecipeCategoryRepository,
    IngredientCategoryRepository,
    IngredientRepository,
  ],
})
export class PrismaModule {}
