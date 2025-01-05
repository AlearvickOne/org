import { inject, injectable } from 'inversify';
import { HttpService } from './http.service';

@injectable()
export class AdminService {
  constructor(@inject('HttpService') private httpService: HttpService) {}

  async getAllUsers() {
    return await this.httpService.get('admin/get-all-users');
  }
}
