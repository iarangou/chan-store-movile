import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { MyProductsModule } from './my-products/my-products.module';
import { PingModule } from './ping/ping.module';
import { ProductsModule } from './products/products.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { StoreModule } from './store/store.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');

        if (!uri) {
          throw new Error('MONGODB_URI is not defined in the environment variables');
        }

        return {
          uri,
        };
      },
    }),
    UsersModule,
    EmailModule,
    ResetPasswordModule,
    AuthModule,
    PingModule,
    StoreModule,
    ProductsModule,
    MyProductsModule,
  ],
})
export class AppModule {}
