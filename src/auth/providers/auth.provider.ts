import { Provider } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants/auth.provider';
import { AuthService } from '../services/auth.service';

export const AuthProvider: Provider[] = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
];