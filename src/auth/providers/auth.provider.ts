import { Provider } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants/auth.provider';
import { Auth } from '../services/auth';

export const AuthProvider: Provider[] = [
  {
    provide: AUTH_SERVICE,
    useClass: Auth,
  },
];