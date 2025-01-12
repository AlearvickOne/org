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
}
