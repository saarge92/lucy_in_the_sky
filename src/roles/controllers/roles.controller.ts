import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/user/entity/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleService } from '../services/role.service';
import { Roles, RolesMode } from '../../auth/decorators/role-decorator';
import { RoleEnum } from '../../auth/enums/RoleEnum';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Response } from 'express';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly roleService: RoleService) {
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @RolesMode(false)
  @Roles(RoleEnum.Admin)
  public async createRole(@Body() roleDto: CreateRoleDto): Promise<Observable<Role>> {
    return await this.roleService.createRole(roleDto);
  }

  @Get('/')
  @RolesMode(false)
  @Roles(RoleEnum.Admin)
  @HttpCode(HttpStatus.OK)
  public async getAllRoles(): Promise<Array<Role>> {
    return await this.roleService.getAllRoles();
  }

  @Get('/:id')
  @Roles(RoleEnum.Admin)
  public async getRole(@Param('id') id: number): Promise<Role> {
    return await this.roleService.getRoleById(id);
  }

  @Delete('/:id')
  @Roles(RoleEnum.Admin)
  public async delete(@Param('id') id: number, @Res() response: Response) {
    await this.roleService.deleteRole(id);
    return response.json({
      message: 'Successfully deleted',
    });
  }
}