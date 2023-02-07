import { Injectable } from "@nestjs/common";
import { IngredientRepository } from "./IngredientRepository";
import { CreateIngredientDTO, UpdateIngredientDTO } from "./IngredientDTOs";
import { IngredientCategoryRepository } from "./ingredient-categories/IngredientCategoryRepository";
import { IngredientMeasureService } from "./ingredient-measures/IngredientMeasureService";
import { QueryIngredientsDTO } from "../QueryAllDTO";
import { IngredientMeasureRepository } from "./ingredient-measures/IngredientMeasureRepository";

@Injectable()
export class IngredientService {
  constructor(
    private ingredientRepository: IngredientRepository,
    private ingredientCategoryRepository: IngredientCategoryRepository,
    private ingredientMeasureRepository: IngredientMeasureRepository,
    private ingredientMeasureService: IngredientMeasureService,
  ) {}

  async create({ measures: measuresDTO, ...data }: CreateIngredientDTO) {
    const dbIngredient = await this.ingredientRepository.create(data);

    if (measuresDTO) {
      const ingredientMeasures = await this.ingredientMeasureService.createMeasures(dbIngredient.id, measuresDTO);

      return this.formatIngredient({
        ...dbIngredient,
        ingredientMeasures,
      }, true);
    }

    return this.formatIngredient(dbIngredient, false);
  }

  async get(id: string, includeMeasures = false) {
    const dbIngredient = await this.ingredientRepository.get(id, { includeMeasures });
    return this.formatIngredient(dbIngredient, includeMeasures);
  }

  async delete(id: string) {
    await this.ingredientRepository.delete(id);
  }

  formatIngredient(dbIngredient, includeMeasures = false) {
    const { ingredientMeasures: measures, ...ingredient } = dbIngredient;

    if (includeMeasures) {
      return {
        ...ingredient,
        measures,
      };
    } else {
      return ingredient;
    }
  }

  async getAll({ measures: includeMeasures, category: includeCategory, ...query }: QueryIngredientsDTO) {
    const dbIngredients = await this.ingredientRepository.getAll(
      query,
      { includeMeasures }
    );
    const ingredients = [];

    for (const dbIngredient of dbIngredients) {
      const ingredient = this.formatIngredient(dbIngredient, includeMeasures);
      ingredients.push(ingredient);
    }

    if (includeCategory) {
      const categories = this.sortByCategories(ingredients);
      return { categories };
    } else return { ingredients };
  }

  sortByCategories(ingredients) {
    const results = [];

    for (const { category: dbCategory, ...ingredient } of ingredients) {
      const category = results.find((c) => c.id === dbCategory.id);
      if (!category) {
        results.push({
          ...dbCategory,
          ingredients: [ingredient],
        });
      } else {
        category.ingredients.push(ingredient);
      }
    }

    return results;
  }

  async update(id: string, { measures = [], ...data }: UpdateIngredientDTO) {
    await this.ingredientRepository.update(id, data);
    await this.ingredientMeasureRepository.deleteAll(id);

    for (const measure of measures) {
      await this.ingredientMeasureRepository.create(id, measure);
    }
  }
}