import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GoodModule } from './good/good.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot()
    , UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
