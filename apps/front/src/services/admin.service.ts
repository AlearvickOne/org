import { inject, injectable } from 'inversify';
import { HttpService } from './http.service';
import { UsersModel } from '../../../../types/models/users.model';

@injectable()
export class AdminService {
  constructor(@inject('HttpService') private httpService: HttpService) {}

  async getAllUsers() {
    return await this.httpService.get('admin/get-all-users');
  }

  async getUser(id: string) {
    return await this.httpService.get(`admin/get-user?id=${id}`);
  }

  async saveEditUser(user: UsersModel) {
    return await this.httpService.post('admin/save-user', user);
  }

  async getRoles() {
    return await this.httpService.get('admin/get-roles');
  }

  async userArchived(userId: number, isArchived: boolean) {
    return await this.httpService.post(`admin/user-archived?id=${userId}`, {
      isArchived: +isArchived,
    });
  }

  async deleteUser(userId: number) {
    return await this.httpService.delete(`admin/user-delete?id=${userId}`);
  }
}
