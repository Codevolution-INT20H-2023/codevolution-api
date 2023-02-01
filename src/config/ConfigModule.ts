import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SecurityConfigService } from './SecurityConfigService';

@Module({
  providers: [SecurityConfigService],
  exports: [SecurityConfigService],
})
export class ConfigModule extends _ConfigModule {}
