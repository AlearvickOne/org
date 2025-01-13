import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { BlogsModel } from '@org/types';
import { AdminService } from '../../../../services/admin.service';
import ioc from '../../../../../ioc/ioc';

@injectable()
export class AdminBlogsStore {
  adminService: AdminService;

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  blogs: BlogsModel[] = [];

  async getBlogs() {
    this.blogs = await this.adminService.getBlogs();
  }

  async deleteBlog(id: number) {
    try {
      if (!id) {
        return;
      }

      await this.adminService.deleteBlog(id);
      await this.getBlogs();
    } catch (error) {
      console.error(error);
    }
  }
}
