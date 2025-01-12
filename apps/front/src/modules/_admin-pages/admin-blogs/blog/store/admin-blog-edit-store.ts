import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { AdminService } from '../../../../../services/admin.service';
import ioc from '../../../../../../ioc/ioc';

@injectable()
export class AdminBlogEditStore {
  adminService: AdminService;

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  title: string = '';
  description: string = '';
  content: string = '';

  setTitle(v: string) {
    this.title = v;
  }

  setDescription(v: string) {
    this.description = v;
  }

  setContent(v: string) {
    this.content = v;
    console.log(this.content);
  }

  async saveContentBlog() {
    await this.adminService.saveContentBlog({
      title: this.title,
      description: this.description,
      content: this.content,
    });
  }

  async getContentBlog(id: string) {
    if (!id) {
      return;
    }

    const blog = await this.adminService.getContentBlog(id);
    this.content = blog.content;
  }
}
