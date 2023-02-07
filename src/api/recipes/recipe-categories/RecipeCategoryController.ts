import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateRecipeCategoryDTO, UpdateRecipeCategoryDTO } from "../RecipeDTOs";
import { RecipeCategoryService } from "./RecipeCategoryService";
import { JwtGuard } from "../../../security/JwtGuard";
import { RecipeCategoryByIdPipe } from "./RecipeCategoryByIdPipe";
import { QueryAllDTO } from "../../QueryAllDTO";

@Controller({
  path: '/recipeCategories',
})
export class RecipeCategoryController {
  constructor(
    private recipeCategoryService: RecipeCategoryService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() body: CreateRecipeCategoryDTO,
  ) {
    return this.recipeCategoryService.create(body);
  }

  @UseGuards(JwtGuard)
  @Patch('/:recipeCategoryId')
  update(
    @Param('recipeCategoryId', RecipeCategoryByIdPipe) recipeCategoryId: string,
    @Body() body: UpdateRecipeCategoryDTO,
  ) {
    return this.recipeCategoryService.update(recipeCategoryId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:recipeCategoryId')
  delete(
    @Param('recipeCategoryId', RecipeCategoryByIdPipe) recipeCategoryId: string,
  ) {
    return this.recipeCategoryService.delete(recipeCategoryId);
  }

  @Get()
  async getAll(
    @Query() query: QueryAllDTO,
  ) {
    const categories = await this.recipeCategoryService.getAll(query);

    return { categories };
  }

  @Get('/:recipeCategoryId')
  get(
    @Param('recipeCategoryId', RecipeCategoryByIdPipe) recipeCategoryId: string,
  ) {
    return this.recipeCategoryService.get(recipeCategoryId);
  }
}