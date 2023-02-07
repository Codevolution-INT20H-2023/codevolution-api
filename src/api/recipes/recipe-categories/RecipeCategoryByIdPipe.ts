import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { RecipeCategoryRepository } from "./RecipeCategoryRepository";

@Injectable()
export class RecipeCategoryByIdPipe implements PipeTransform {
  constructor(
    private recipeCategoryRepository: RecipeCategoryRepository,
  ) {}

  async transform(value: string) {
    const recipe = await this.recipeCategoryRepository.get(value);

    if (!recipe) {
      throw new BadRequestException('The recipe\'s category id is invalid');
    }

    return value;
  }

}