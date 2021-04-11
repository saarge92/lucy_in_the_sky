import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles.controller';
import { RoleService } from './services/role.service';
import { Role } from '../user/entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [RoleService],
  controllers: [RolesController],
})
export class RolesModule {
}