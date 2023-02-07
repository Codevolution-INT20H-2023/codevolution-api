import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { UserRepository } from "../api/users/UserRepository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private securityConfig: SecurityConfigService,
      private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: securityConfig.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    return this.userRepository.get(payload.sub);
  }
}
