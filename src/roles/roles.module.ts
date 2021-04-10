import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "dist/user/entity/role.entity";
import { RolesController } from "./controllers/roles.controller";
import { RoleService } from "./services/role.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    providers: [RoleService],
    controllers: [RolesController]
})
export class RolesModule { }