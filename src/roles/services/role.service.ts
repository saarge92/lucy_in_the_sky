import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "dist/user/entity/role.entity";
import { Observable, of } from "rxjs";
import { Repository } from "typeorm";
import { CreateRoleDto } from "../dto/create-role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) { }

    public async createRole(roleDto: CreateRoleDto): Promise<Observable<Role>> {
        const role = new Role()
        role.name = roleDto.name;
        await this.roleRepository.save(role);
        return of(role);
    }
}