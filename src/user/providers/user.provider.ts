import { Provider } from '@nestjs/common';
import {  USER_SERVICE } from '../constants/providers.constants';
import { UserService } from '../services/user.service';

export const UserProvider: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];