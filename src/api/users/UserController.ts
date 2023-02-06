import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { UserByIdPipe } from "./UserByIdPipe";
import { UserService } from "./UserService";
import {
  CreateProductDTO,
  CreateProductsDTO,
  DeleteProductsDTO,
  UpdateProductDTO,
  UpdateProductsDTO,
} from "./UserDTOs";
import { IngredientByIdPipe } from "../ingredients/IngredientByIdPipe";
import { JwtGuard } from "../../security/JwtGuard";

@Controller({
  path: '/users',
})
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('/:userId/products')
  createProduct(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateProductDTO
  ) {
    return this.userService.createProduct(userId, body);
  }

  @UseGuards(JwtGuard)
  @Patch('/:userId/products/:ingredientId')
  updateProduct(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() body: UpdateProductDTO,
  ) {
    return this.userService.updateProduct(userId, ingredientId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:userId/products/:ingredientId')
  deleteProduct(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.userService.deleteProduct(userId, ingredientId);
  }

  @UseGuards(JwtGuard)
  @Put('/:userId/products')
  async createProducts(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateProductsDTO,
  ) {
    const products = await this.userService.createProducts(userId, body.products);

    return { products };
  }

  @UseGuards(JwtGuard)
  @Patch('/:userId/products')
  updateProducts(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateProductsDTO,
  ) {
    return this.userService.updateProducts(userId, body.products);
  }

  @UseGuards(JwtGuard)
  @Delete('/:userId/products')
  deleteProducts(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: DeleteProductsDTO,
  ) {
    return this.userService.deleteProducts(userId, body.ingredients);
  }

  @UseGuards(JwtGuard)
  @Get('/:userId/products')
  getProducts(
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getProducts(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/:userId/products/:ingredientId')
  getProduct(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.userService.getProduct(userId, ingredientId);
  }

  @UseGuards(JwtGuard)
  @Get('/:userId/availableRecipes')
  getAvailableRecipes(
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getAvailableRecipes(userId);
  }

}