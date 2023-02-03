import { Body, Controller, Param, Patch, Post, Put } from "@nestjs/common";
import { UserByIdPipe } from "./UserByIdPipe";
import { UserService } from "./UserService";
import { CreateProductDTO, CreateProductsDTO, UpdateProductDTO } from "./UserDTOs";

@Controller({
  path: '/users',
})
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/:userId/products')
  createProduct(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateProductDTO
  ) {
    return this.userService.createProduct(userId, body);
  }

  @Put('/:userId/products')
  createProducts(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateProductsDTO,
  ) {
    return this.userService.createProducts(userId, body.products);
  }

  @Patch('/:userId/products/:ingredientId')
  updateProduct(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() body: UpdateProductDTO,
  ) {
    return this.userService.updateProduct(userId, ingredientId, body);
  }

}