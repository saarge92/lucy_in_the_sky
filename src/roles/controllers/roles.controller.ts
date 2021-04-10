import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "src/user/entity/role.entity";
import { CreateRoleDto } from "../dto/create-role.dto";
import { RoleService } from "../services/role.service";

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RoleService) { }

    @Post('/')
    @HttpCode(HttpStatus.OK)
    public async createRole(@Body() roleDto: CreateRoleDto): Promise<Observable<Role>> {
        return await this.roleService.createRole(roleDto)
    }
}