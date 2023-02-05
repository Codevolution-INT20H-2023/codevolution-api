import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { IngredientCategoryService } from "./IngredientCategoryService";
import { CreateIngredientCategoryDTO, UpdateIngredientCategoryDTO } from "./IngredientCategoryDTOs";
import { QueryAllDTO } from "../../QueryAllDTO";
import { JwtGuard } from "../../../security/JwtGuard";

@Controller({
  path: '/ingredientCategories',
})
export class IngredientCategoryController {
  constructor(
    private ingredientCategoryService: IngredientCategoryService,
  ) {}

  @Get()
  async getAll(
    @Query() query: QueryAllDTO,
  ) {
    const categories = await this.ingredientCategoryService.getAll(query);

    return { categories };
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Patch('/:ingredientCategoryId')
  update(
    @Param('ingredientCategoryId') ingredientCategoryId: string,
    @Body() body: UpdateIngredientCategoryDTO,
  ) {
    return this.ingredientCategoryService.update(ingredientCategoryId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:ingredientCategoryId')
  delete(
    @Param('ingredientCategoryId') ingredientCategoryId: string,
  ) {
    return this.ingredientCategoryService.delete(ingredientCategoryId);
  }
}