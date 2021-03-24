import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { RoleSeeder } from './seeds/role.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../user/entity/role.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';


@Module({
  imports: [CommandModule,
    ConfigModule.forRoot(),
    TypeOrmCoreModule.forRoot(),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [RoleSeeder],
  exports: [],
})
export class SeederModule {
}