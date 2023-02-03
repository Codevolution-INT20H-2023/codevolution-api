import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { RecipeService } from "./RecipeService";
import { CreateProductDTO, CreateProductsDTO, CreateRecipeDTO, UpdateProductDTO, UpdateRecipeDTO } from "./RecipeDTOs";

@Controller({
  path: '/recipes',
})
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
  ) {}

  @Get()
  getAll(
    @Query() query,
  ) {
    return this.recipeService.getAll(query);
  }

  @Post()
  create(
    @Body() body: CreateRecipeDTO,
  ) {
    return this.recipeService.create(body);
  }

  @Post('/:recipeId/products')
  createProduct(
    @Param('recipeId') recipeId: string,
    @Body() body: CreateProductDTO,
  ) {
    return this.recipeService.createProduct(recipeId, body);
  }

  @Put('/:recipeId/products')
  createProducts(
    @Param('recipeId') recipeId: string,
    @Body() body: CreateProductsDTO,
  ) {
    const products = this.recipeService.createProducts(recipeId, body.products);

    return { products };
  }

  @Delete('/:recipeId/products/:ingredientId')
  deleteProduct(
    @Param('recipeId') recipeId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.recipeService.deleteProduct(recipeId, ingredientId);
  }

  @Patch('/:recipeId/products/:ingredientId')
  updateProduct(
    @Param('recipeId') recipeId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() body: UpdateProductDTO,
  ) {
    return this.recipeService.updateProduct(recipeId, ingredientId, body);
  }

  @Get('/:recipeId')
  get(
    @Param('recipeId') recipeId: string,
  ) {
    return this.recipeService.get(recipeId);
  }

  @Patch('/:recipeId')
  update(
    @Param('recipeId') recipeId: string,
    @Body() body: UpdateRecipeDTO,
  ) {
    return this.recipeService.update(recipeId, body);
  }

  @Delete('/:recipeId')
  delete(
    @Param('recipeId') recipeId: string,
  ) {
    return this.recipeService.delete(recipeId);
  }
}