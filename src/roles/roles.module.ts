import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles.controller';
import { Role } from '../user/entity/role.entity';
import { RoleProvider } from './providers/role-provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [...RoleProvider],
  controllers: [RolesController],
})
export class RolesModule {
}