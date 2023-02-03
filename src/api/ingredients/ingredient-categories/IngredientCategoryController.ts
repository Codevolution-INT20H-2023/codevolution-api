import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { IngredientCategoryService } from "./IngredientCategoryService";
import { CreateIngredientCategoryDTO, UpdateIngredientCategoryDTO } from "./IngredientCategoryDTOs";

@Controller({
  path: '/ingredientCategories',
})
export class IngredientCategoryController {
  constructor(
    private ingredientCategoryService: IngredientCategoryService,
  ) {}

  @Get()
  getAll(
    @Query() query,
  ) {
    return this.ingredientCategoryService.getAll(query);
  }

  @Post()
  create(
    @Body() body: CreateIngredientCategoryDTO,
  ) {
    return this.ingredientCategoryService.create(body);
  }

  @Get('/:ingredientCategoryId')
  get(
    @Param('ingredientCategoryId') ingredientCategoryId: string,
  ) {
    return this.ingredientCategoryService.get(ingredientCategoryId);
  }

  @Patch('/:ingredientCategoryId')
  update(
    @Param('ingredientCategoryId') ingredientCategoryId: string,
    @Body() body: UpdateIngredientCategoryDTO,
  ) {
    return this.ingredientCategoryService.update(ingredientCategoryId, body);
  }

  @Delete('/:ingredientCategoryId')
  delete(
    @Param('ingredientCategoryId') ingredientCategoryId: string,
  ) {
    return this.ingredientCategoryService.delete(ingredientCategoryId);
  }
}