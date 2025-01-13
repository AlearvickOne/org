import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { BlogsModel } from '@org/types';
import { UserService } from '../../../../services/user.service';
import ioc from '../../../../../ioc/ioc';

@injectable()
export class HomeBlogsStore {
  userService: UserService;

  constructor() {
    makeAutoObservable(this);
    this.userService = ioc.get<UserService>('UserService');
  }

  blogs: BlogsModel[] = [];

  async loadBlogs() {
    this.blogs = await this.userService.getBlogs();
  }
}
