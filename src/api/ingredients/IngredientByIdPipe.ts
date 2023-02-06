import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { IngredientRepository } from "./IngredientRepository";

@Injectable()
export class IngredientByIdPipe implements PipeTransform {
  constructor(
    private ingredientRepository: IngredientRepository,
  ) {}

  async transform(value: string) {
    const recipe = await this.ingredientRepository.get(value);

    if (!recipe) {
      throw new BadRequestException('The ingredient id is invalid');
    }

    return value;
  }
}