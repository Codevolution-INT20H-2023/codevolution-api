import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { IngredientService } from "./IngredientService";
import { CreateIngredientDTO, UpdateIngredientDTO } from "./IngredientDTOs";

@Controller({
  path: '/ingredients',
})
export class IngredientController {
  constructor(
    private ingredientService: IngredientService,
  ) {}

  @Get()
  getAll(
    @Query() query,
  ) {
    return this.ingredientService.getAll(query);
  }

  @Post()
  create(
    @Body() body: CreateIngredientDTO,
  ) {
    return this.ingredientService.create(body);
  }

  @Get('/:ingredientId')
  get(
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.ingredientService.get(ingredientId);
  }

  @Patch('/:ingredientId')
  update(
    @Param('ingredientId') ingredientId: string,
    @Body() body: UpdateIngredientDTO,
  ) {
    return this.ingredientService.update(ingredientId, body);
  }

  @Delete('/:ingredientId')
  delete(
      @Param('ingredientId') ingredientId: string,
  ) {
    return this.ingredientService.delete(ingredientId);
  }


}