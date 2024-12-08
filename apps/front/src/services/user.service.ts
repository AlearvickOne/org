import { inject, injectable } from 'inversify';
import { HttpService } from './http.service';

@injectable()
export class UserService {
  constructor(@inject('HttpService') private httpService: HttpService) {}

  async getMessage() {
    return this.httpService.get('user/message');
  }

  async register(data: any) {
    return this.httpService.post('user/register', data);
  }
}
