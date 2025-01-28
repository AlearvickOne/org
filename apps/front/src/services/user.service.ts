import { inject, injectable } from 'inversify';
import { HttpService } from './http.service';
import { UsersModel } from '@org/types';

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

  async getMyUserAndEmail() {
    return this.httpService.get('user/get-my-user-and-email');
  }

  async saveUser(user: UsersModel, password: string, avatar: File | null) {
    const path = 'user/save-user';

    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);

      await this.httpService.postFormData('user/save-avatar-user', formData);
    }

    if (password.length > 0) {
      const u = { ...user, password: password };
      return await this.httpService.put(path, u);
    }

    return await this.httpService.put(path, user);
  }

  async getBlogs() {
    return this.httpService.get('user/get-blogs');
  }

  async getBlog(id: string) {
    return this.httpService.get(`user/get-blog?id=${id}`);
  }

  async getRandomBlogs() {
    return await this.httpService.get('user/get-random-blogs');
  }
}
