import { Injectable } from "@nestjs/common";
import { IngredientMeasureRepository } from "./IngredientMeasureRepository";
import { IngredientMeasureDTO, UpdateIngredientMeasureDTO } from "../IngredientDTOs";
import { Measure } from "@prisma/client";
import { IngredientRepository } from "../IngredientRepository";

@Injectable()
export class IngredientMeasureService {
  constructor(
    private ingredientMeasureRepository: IngredientMeasureRepository,
    private ingredientRepository: IngredientRepository,
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
}