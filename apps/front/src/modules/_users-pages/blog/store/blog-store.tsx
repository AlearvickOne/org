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
  randomBlogs: BlogsModel[] = [];

  comments: string[] = [];

  newComment: string = '';

  async loadBlog(id: string) {
    if (!id) {
      return;
    }

    this.blog = await this.userService.getBlog(id);
  }

  async loadRandomBlogs() {
    this.randomBlogs = await this.userService.getRandomBlogs();
  }

  setNewComment(v: string) {
    this.newComment = v;
  }

  pushComment() {
    this.comments.push(this.newComment);
    this.newComment = '';
  }
}
