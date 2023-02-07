import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
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
  @Post('/products')
  createProduct(
    @Request() req,
    @Body() body: CreateProductDTO
  ) {
    return this.userService.createProduct(req.user.id, body);
  }

  @UseGuards(JwtGuard)
  @Patch('/products/:ingredientId')
  updateProduct(
    @Request() req,
    @Param('ingredientId') ingredientId: string,
    @Body() body: UpdateProductDTO,
  ) {
    return this.userService.updateProduct(req.user.id, ingredientId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('/products/:ingredientId')
  deleteProduct(
    @Request() req,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.userService.deleteProduct(req.user.id, ingredientId);
  }

  @UseGuards(JwtGuard)
  @Put('/products')
  async createProducts(
    @Request() req,
    @Body() body: CreateProductsDTO,
  ) {
    const products = await this.userService.createProducts(req.user.id, body.products);

    return { products };
  }

  @UseGuards(JwtGuard)
  @Patch('/products')
  updateProducts(
    @Request() req,
    @Body() body: UpdateProductsDTO,
  ) {
    return this.userService.updateProducts(req.user.id, body.products);
  }

  @UseGuards(JwtGuard)
  @Delete('/products')
  deleteProducts(
    @Request() req,
    @Body() body: DeleteProductsDTO,
  ) {
    return this.userService.deleteProducts(req.user.id, body.ingredients);
  }

  @UseGuards(JwtGuard)
  @Get('/products')
  async getProducts(
    @Request() req,
  ) {
    const products = await this.userService.getProducts(req.user.id);

    return { products };
  }

  @UseGuards(JwtGuard)
  @Get('/products/:ingredientId')
  getProduct(
    @Request() req,
    @Param('ingredientId', IngredientByIdPipe) ingredientId: string,
  ) {
    return this.userService.getProduct(req.user.id, ingredientId);
  }

  @UseGuards(JwtGuard)
  @Get('/availableRecipes')
  async getAvailableRecipes(
    @Request() req,
  ) {
    const availableRecipes = await this.userService.getAvailableRecipes(req.user.id);

    return { availableRecipes };
  }

}