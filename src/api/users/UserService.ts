import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { UserProductRepository } from "./UserProductRepository";
import { CreateProductDTO, UpdateProductDTO } from "./UserDTOs";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userProductRepository: UserProductRepository,
  ) {}


  createProduct(userId: string, body: CreateProductDTO) {

  }

  createProducts(userId: string, products: CreateProductDTO[]) {

  }

  updateProduct(userId: string, ingredientId: string, data: UpdateProductDTO) {

  }
}