import { Provider } from '@nestjs/common';
import { GOOD_SERVICE } from '../constans/good.constant';
import { GoodService } from '../services/good.service';

export const GoodProvider: Array<Provider> = [
  {
    provide: GOOD_SERVICE,
    useClass: GoodService,
  },
];