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

  page: number = 1;
  take: number = 10;
  quantityPages = 1;

  searchBlogById: string = '';
  searchBlogByTitle: string = '';

  blogs: BlogsModel[] = [];

  async getBlogs() {
    const [blogs, count] = await this.adminService.getBlogs(
      this.page,
      this.take,
      this.searchBlogById,
      this.searchBlogByTitle
    );
    this.blogs = blogs;
    this.quantityPages = Math.ceil(count / this.take);
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

  async setPage(v: number) {
    this.page = v;
    this.getBlogs().then();
  }

  async setSearchBlogById(v: string) {
    this.searchBlogById = v;
  }

  async setSearchBlogByTitle(v: string) {
    this.searchBlogByTitle = v;
  }
}
