import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UserService } from '../../../../services/user.service';
import ioc from '../../../../../ioc/ioc';
import { BlogsModel, defaultBlogsModel } from '@org/types';
import { io } from 'socket.io-client';
import { socketUrl } from '../../../../../conf';
import { UserStore } from '../../../../main-stores/user-store';

@injectable()
export class BlogStore {
  userService: UserService;
  userStore: UserStore;

  socket = io(socketUrl);

  constructor() {
    makeAutoObservable(this);
    this.userService = ioc.get<UserService>('UserService');
    this.userStore = ioc.get<UserStore>('UserStore');

    this.events().then();
  }

  blog: BlogsModel = defaultBlogsModel;
  randomBlogs: BlogsModel[] = [];

  comments: { userId: number; comment: string }[] = [];

  newComment: string = '';

  async loadBlog(id: string) {
    if (!id) {
      return;
    }

    this.blog = await this.userService.getBlog(id);
  }

  async events() {
    this.socket.on('commented', (data) => {
      this.comments = data;
    });
  }

  async loadRandomBlogs() {
    this.randomBlogs = await this.userService.getRandomBlogs();
  }

  setNewComment(v: string) {
    this.newComment = v;
  }

  pushComment() {
    this.socket.emit('comment', {
      userId: this.userStore.user.id,
      comment: this.newComment,
    });
  }
}
