import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { AdminService } from '../../../../../services/admin.service';
import ioc from '../../../../../../ioc/ioc';
import { pagesNames } from '../../../../../pages/pages-names';
import { BlogsModel, defaultBlogsModel } from '@org/types';

@injectable()
export class AdminBlogEditStore {
  adminService: AdminService;

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  blog: BlogsModel = defaultBlogsModel;

  setTitle(v: string) {
    this.blog.title = v;
  }

  setDescription(v: string) {
    this.blog.description = v;
  }

  setContent(v: string) {
    this.blog.content = v;
  }

  async saveContentBlog() {
    try {
      const blogId = await this.adminService.saveContentBlog({
        id: this.blog.id,
        title: this.blog.title,
        description: this.blog.description,
        content: this.blog.content,
      });

      window.location.replace(`${pagesNames.adminBlogs}/blog?id=${blogId}`);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async getContentBlog(id: string) {
    this.blog = defaultBlogsModel;

    if (!id) {
      return;
    }

    const blog = await this.adminService.getContentBlog(id);

    this.blog.id = blog.id;
    this.blog.title = blog.title;
    this.blog.description = blog.description;
    this.blog.content = blog.content;
  }
}
