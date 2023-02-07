import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { RecipeService } from "./RecipeService";
import {
  CreateProductDTO,
  CreateProductsDTO,
  CreateRecipeDTO, DeleteProductsDTO,
  UpdateProductDTO,
  UpdateProductsDTO,
  UpdateRecipeDTO,
} from "./RecipeDTOs";
import { JwtGuard } from "../../security/JwtGuard";
import { RecipeByIdPipe } from "./RecipeByIdPipe";
import { IngredientByIdPipe } from "../ingredients/IngredientByIdPipe";

@Controller({
  path: '/recipes',
})
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() body: CreateRecipeDTO,
  ) {
    return this.recipeService.create(body);
  }

  @UseGuards(JwtGuard)
  @Patch('/:recipeId')
  update(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Body() body: UpdateRecipeDTO,
  ) {
    return this.recipeService.update(recipeId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:recipeId')
  delete(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
  ) {
    return this.recipeService.delete(recipeId);
  }

  @Get('/:recipeId')
  get(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Query('products', ParseBoolPipe) products: boolean,
  ) {
    return this.recipeService.get(recipeId, products);
  }

  @Get()
  async getAll(
    @Query('products', ParseBoolPipe) products: boolean,
  ) {
    const recipes = await this.recipeService.getAll(products);
    return { recipes };
  }

  @UseGuards(JwtGuard)
  @Post('/:recipeId/products')
  createProduct(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Body() body: CreateProductDTO,
  ) {
    return this.recipeService.createProduct(recipeId, body);
  }

  @UseGuards(JwtGuard)
  @Patch('/:recipeId/products/:ingredientId')
  updateProduct(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
    @Body() body: UpdateProductDTO,
  ) {
    return this.recipeService.updateProduct(recipeId, ingredientId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:recipeId/products/:ingredientId')
  deleteProduct(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.recipeService.deleteProduct(recipeId, ingredientId);
  }

  @UseGuards(JwtGuard)
  @Put('/:recipeId/products')
  createProducts(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Body() body: CreateProductsDTO,
  ) {
    const products = this.recipeService.createProducts(recipeId, body.products);

    return { products };
  }

  @UseGuards(JwtGuard)
  @Patch('/:recipeId/products')
  updateProducts(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Body() body: UpdateProductsDTO,
  ) {
    return this.recipeService.updateProducts(recipeId, body.products);
  }

  @UseGuards(JwtGuard)
  @Delete('/:recipeId/products')
  deleteProducts(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Body() body: DeleteProductsDTO,
  ) {
    return this.recipeService.deleteProducts(recipeId, body.ingredients);
  }

  @Get('/:recipeId/products')
  async getProducts(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
  ) {
    const products = await this.recipeService.getProducts(recipeId);

    return { products };
  }

  @Get('/:recipeId/products/:ingredientId')
  getProduct(
    @Param('recipeId', RecipeByIdPipe) recipeId: string,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.recipeService.getProduct(recipeId, ingredientId);
  }
}