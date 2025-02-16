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

  searchBlogs: string = '';
  page: number = 1;
  take: number = 10;
  quantityPages: number = 0;

  async loadBlogs() {
    const [blogs, count] = await this.userService.getBlogs(
      this.page,
      this.take,
      this.searchBlogs
    );
    this.blogs = blogs;
    this.quantityPages = Math.ceil(count / this.take);
  }

  setPage(page: number) {
    this.page = page;
    this.loadBlogs().then();
  }

  setSearchBlogs(search: string) {
    this.searchBlogs = search;
    this.page = 1;
  }
}
