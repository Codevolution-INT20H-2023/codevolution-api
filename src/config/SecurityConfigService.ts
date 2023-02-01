import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigService {
  constructor(private configService: ConfigService) {}

  get secret() {
    return this.configService.get<string>('security.secret');
  }

  get jwtTtl(): string {
    return this.configService.get<string>('security.jwt.ttl');
  }

  get jwtRefreshTtl(): string {
    return this.configService.get<string>('security.jwt.refreshTtl');
  }
}
