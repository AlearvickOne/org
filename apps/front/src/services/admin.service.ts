import { inject, injectable } from 'inversify';
import { HttpService } from './http.service';
import { UsersModel } from '@org/types';

@injectable()
export class AdminService {
  constructor(@inject('HttpService') private httpService: HttpService) {}

  async getAllUsers(
    searchUserById: string,
    searchUserByEmail: string,
    searchUserByNickname: string,
    page: number,
    take: number
  ) {
    return await this.httpService.get(
      `admin/get-all-users?page=${page}&take=${take}&search_user_by_id=${searchUserById}&search_user_by_email=${searchUserByEmail}&search_user_by_nickname=${searchUserByNickname}`
    );
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

  async saveContentBlog(data: any) {
    return await this.httpService.postFormData('admin/save-content-blog', data);
  }

  async getBlogs(
    page: number,
    take: number,
    searchBlogById: string,
    searchBlogByTitle: string
  ) {
    return await this.httpService.get(
      `admin/get-blogs?page=${page}&take=${take}&search_blog_by_id=${searchBlogById}&search_blog_by_title=${searchBlogByTitle}`
    );
  }

  async getContentBlog(id: string) {
    return await this.httpService.get(`admin/get-content-blog?id=${id}`);
  }

  async deleteBlog(id: number) {
    return await this.httpService.delete(`admin/delete-blog?id=${id}`);
  }
}
