import { inject, injectable } from 'inversify';
import { HttpService } from './http.service';

@injectable()
export class UserService {
  constructor(@inject('HttpService') private httpService: HttpService) {}

  async register(data: any) {
    return this.httpService.post('auth/register', data);
  }

  async login(data: { password: string; email: string }) {
    return this.httpService.post('auth/login', data);
  }

  async logout() {
    return this.httpService.get('auth/logout');
  }

  async getMyUser() {
    return this.httpService.get('user/get-my-user');
  }
}
