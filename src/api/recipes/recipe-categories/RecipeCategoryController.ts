import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateRecipeCategoryDTO, UpdateRecipeCategoryDTO } from "../RecipeDTOs";
import { RecipeCategoryService } from "./RecipeCategoryService";

@Controller({
  path: '/recipeCategories',
})
export class RecipeCategoryController {
  constructor(
    private recipeCategoryService: RecipeCategoryService,
  ) {}

  @Get()
  getAll(
    @Query() query,
  ) {
    return this.recipeCategoryService.getAll(query);
  }

  @Post()
  create(
    @Body() body: CreateRecipeCategoryDTO,
  ) {
    return this.recipeCategoryService.create(body);
  }

  @Get('/:recipeCategoryId')
  get(
    @Param('recipeCategoryId') recipeCategoryId: string,
  ) {
    return this.recipeCategoryService.get(recipeCategoryId);
  }

  @Patch('/:recipeCategoryId')
  update(
    @Param('recipeCategoryId') recipeCategoryId: string,
    @Body() body: UpdateRecipeCategoryDTO,
  ) {
    return this.recipeCategoryService.update(recipeCategoryId, body);
  }

  @Delete('/:recipeCategoryId')
  delete(
    @Param('recipeCategoryId') recipeCategoryId: string,
  ) {
    return this.recipeCategoryService.delete(recipeCategoryId);
  }
}