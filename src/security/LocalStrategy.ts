import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserRepository } from "../api/users/UserRepository";
import { UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
      private userRepository: UserRepository,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.find(email, password);

    if (!user) {
      return new UnauthorizedException('The email or password are incorrect');
    }

    return user;
  }
}