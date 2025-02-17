import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { AdminService } from '../../../../../services/admin.service';
import ioc from '../../../../../../ioc/ioc';
import { pagesNames } from '../../../../../pages-names';
import { BlogsModel, defaultBlogsModel } from '@org/types';

@injectable()
export class AdminBlogEditStore {
  adminService: AdminService;

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  blog: BlogsModel = defaultBlogsModel;
  fileImage: File | null = null;

  setTitle(v: string) {
    this.blog.title = v;
  }

  setDescription(v: string) {
    this.blog.description = v;
  }

  setContent(v: string) {
    this.blog.content = v;
  }

  setFileImage(v: FileList | null) {
    this.fileImage = v ? v[0] : null;
  }

  async saveContentBlog() {
    try {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          id: this.blog.id,
          title: this.blog.title.trim(),
          description: this.blog.description.trim(),
          content: this.blog.content.trim(),
        })
      );

      if (this.fileImage) {
        formData.append('fileImage', this.fileImage);
      }

      const blogId = await this.adminService.saveContentBlog(formData);

      window.location.replace(`${pagesNames.adminBlogs}/blog?id=${blogId}`);
    } catch (error: any) {
      alert('Ошибка сохранения блога - ' + error.message);
    }
  }

  async getContentBlog(id: string) {
    try {
      this.blog = defaultBlogsModel;

      if (!id) {
        return;
      }

      const content = await this.adminService.getContentBlog(id);

      if (!content) {
        window.location.replace(pagesNames.adminBlogs);
        return;
      }

      this.blog = content;
    } catch (error: any) {
      alert('Контент блога не получен - ' + error.message);
    }
  }
}
