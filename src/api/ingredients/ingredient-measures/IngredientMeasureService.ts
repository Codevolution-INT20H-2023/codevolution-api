import { BadRequestException, Injectable } from "@nestjs/common";
import { IngredientMeasureRepository } from "./IngredientMeasureRepository";
import { IngredientMeasureDTO, UpdateIngredientMeasureDTO } from "../IngredientDTOs";
import { Ingredient, Measure } from "@prisma/client";
import { IngredientRepository } from "../IngredientRepository";
import { GlobalMeasureService } from "../../global-measures/GlobalMeasureService";

@Injectable()
export class IngredientMeasureService {
  constructor(
    private ingredientMeasureRepository: IngredientMeasureRepository,
    private ingredientRepository: IngredientRepository,
    private globalMeasureService: GlobalMeasureService,
  ) {}

  getMeasures(ingredientId: string) {
    return this.ingredientRepository.getMeasures(ingredientId);
  }

  getMeasure(ingredientId: string, measure: Measure) {
    return this.ingredientMeasureRepository.getMeasure(ingredientId, measure);
  }

  createMeasure(ingredientId: string, measure: IngredientMeasureDTO) {
    return this.ingredientMeasureRepository.create(ingredientId, measure);
  }

  async createMeasures(ingredientId: string, measures: IngredientMeasureDTO[]) {
    const results = [];

    for (const measure of measures) {
      results.push(await this.createMeasure(ingredientId, measure));
    }

    return results;
  }
  async updateMeasure(ingredientId: string, measure: Measure, body: UpdateIngredientMeasureDTO) {
    await this.ingredientMeasureRepository.update(ingredientId, measure, body);
  }

  async updateMeasures(ingredientId: string, measures: IngredientMeasureDTO[]) {
    for (const { measure, toStandard } of measures) {
      await this.updateMeasure(ingredientId, measure, { toStandard });
    }
  }

  async deleteMeasure(ingredientId: string, measure: Measure) {
    await this.ingredientMeasureRepository.delete(ingredientId, measure);
  }

  async deleteMeasures(ingredientId: string, measures: Measure[]) {
    for (const measure of measures) {
      await this.deleteMeasure(ingredientId, measure);
    }
  }

  async toStandard(ingredient: Ingredient, measure, amount) {
    const dbMeasure = await this.ingredientMeasureRepository.getMeasure(ingredient.id, measure);
    if (dbMeasure) {
      return amount * dbMeasure.toStandard;
    }

    console.log(ingredient, measure, amount);

    const global = await this.globalMeasureService.get({ from: measure, to: ingredient.standard });
    if (global) {
      return amount * global.coefficient;
    }

    return Number.POSITIVE_INFINITY;
  }
}