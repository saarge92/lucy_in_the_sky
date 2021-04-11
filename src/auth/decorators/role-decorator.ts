import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/RoleEnum';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

export const ROLES_MODE_STRICT = 'ROLES_MODE_STRICT';
export const RolesMode = (strictMode = false) => SetMetadata(ROLES_MODE_STRICT, strictMode);