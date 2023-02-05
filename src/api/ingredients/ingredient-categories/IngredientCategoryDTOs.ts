import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { UKRAINIAN_REGEX } from "../IngredientDTOs";

export class UpdateIngredientCategoryDTO {
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(30, {
    message: 'The maximum length of name is 30',
  })
  @IsNotEmpty()
  name: string;
}

export class CreateIngredientCategoryDTO {
  @Matches(UKRAINIAN_REGEX, {
    message: 'The name doesn\'t consist of ukrainian letters, apostrophe or dash',
  })
  @MinLength(2, {
    message: 'The minimum length of name is 2',
  })
  @MaxLength(30, {
    message: 'The maximum length of name is 30',
  })
  @IsNotEmpty()
  name: string;
}