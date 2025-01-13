import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UserService } from '../../../../services/user.service';
import ioc from '../../../../../ioc/ioc';
import { BlogsModel, defaultBlogsModel } from '@org/types';

@injectable()
export class BlogStore {
  userService: UserService;

  constructor() {
    makeAutoObservable(this);
    this.userService = ioc.get<UserService>('UserService');
  }

  blog: BlogsModel = defaultBlogsModel;

  async loadBlog(id: string) {
    if (!id) {
      return;
    }

    this.blog = await this.userService.getBlog(id);
  }
}
