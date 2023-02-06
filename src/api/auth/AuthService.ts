import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/UserRepository';
import { RegisterDTO, TokensDTO } from "./AuthDTOs";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../../security/JwtPayload";
import { SecurityConfigService } from "../../config/SecurityConfigService";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private securityConfig: SecurityConfigService,
  ) {}

  async register(data: RegisterDTO) {
    const user = await this.userRepository.create(data);

    return this.getTokens(user);
  }

  createPayload(user: User) {
    return {
      sub: user.id,
      email: user.email,
    };
  }

  getTokens(user: User): TokensDTO {
    const payload = this.createPayload(user);

    return {
      accessToken: this.getAccessToken(payload),
    };
  }

  getAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  login(user: User) {
    return this.getTokens(user);
  }
}
