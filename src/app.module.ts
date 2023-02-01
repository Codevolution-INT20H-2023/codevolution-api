import { Module } from '@nestjs/common';
import { ConfigModule } from './config/ConfigModule';
import Configuration from './config/Configuration';
import { ApiModule } from "./api/ApiModule";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    ApiModule,
  ],
})
export class AppModule {}
