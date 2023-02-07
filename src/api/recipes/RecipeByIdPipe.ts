import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { RecipeRepository } from "./RecipeRepository";

@Injectable()
export class RecipeByIdPipe implements PipeTransform {
  constructor(
    private recipeRepository: RecipeRepository,
  ) {}

  async transform(value: string) {
    const recipe = await this.recipeRepository.get(value);

    if (!recipe) {
      throw new BadRequestException('The recipe id is invalid');
    }

    return value;
  }

}