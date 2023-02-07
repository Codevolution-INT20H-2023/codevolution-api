import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserRepository } from "../api/users/UserRepository";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository.find(username, password);

    if (!user) {
      throw new UnauthorizedException('The email or password are incorrect');
    }

    return user;
  }
}