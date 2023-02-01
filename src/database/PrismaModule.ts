import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { UserRepository } from '../api/users/UserRepository';

@Module({
  providers: [PrismaService, UserRepository],
  exports: [PrismaService, UserRepository],
})
export class PrismaModule {}
