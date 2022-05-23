import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { NetworkModule } from './network/network.module';
import { NftsModule } from './nfts/nfts.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, NetworkModule, NftsModule],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
