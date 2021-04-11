import { Provider } from '@nestjs/common';
import { ROLE_SERVICE } from '../constants/roles-constants';
import { RoleService } from '../services/role.service';

export const RoleProvider: Provider[] = [
  {
    provide: ROLE_SERVICE,
    useClass: RoleService,
  },
];