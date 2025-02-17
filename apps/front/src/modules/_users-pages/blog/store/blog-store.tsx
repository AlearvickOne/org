import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UserService } from '../../../../services/user.service';
import ioc from '../../../../../ioc/ioc';
import {
  BlogsModel,
  CommandsWebsocketBlogEnum,
  defaultBlogsModel,
  IUsersComments,
  IUsersCommentsNoId,
  RoomsWebsocketEnum,
} from '@org/types';
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

  comments: IUsersComments[] = [];
  otherUserComment: IUsersCommentsNoId | null = null;

  newComment: string = '';

  async loadBlog(id: string) {
    try {
      if (!id) {
        return;
      }

      this.blog = await this.userService.getBlog(id);

      this.loadComments();
    } catch (error: any) {
      console.error(`Ошибка при загрузке блога №${id} ` + error.message);
    }
  }

  async events() {
    this.socket.on(
      CommandsWebsocketBlogEnum.returnedComments,
      (data: IUsersComments[]) => {
        this.comments = data;
      }
    );

    this.socket.on('error', (err: Error) => {
      console.error(`Ошибка при работе соккета ` + err.message);
    });
  }

  async loadRandomBlogs() {
    try {
      this.randomBlogs = await this.userService.getRandomBlogs();
    } catch (error: any) {
      console.error(`Ошибка при загрузке случайных блогов ` + error.message);
    }
  }

  setNewComment(v: string) {
    this.newComment = v;
  }

  setOtherUserComment(v: IUsersCommentsNoId | null) {
    this.otherUserComment = v;
  }

  pushComment() {
    this.socket.emit(CommandsWebsocketBlogEnum.newComment, {
      blogId: this.blog.id,
      body: {
        userId: this.userStore.user.id,
        nickname: this.userStore.user.nickname,
        comment: this.newComment,
        otherUserComment: this.otherUserComment,
      },
    });

    this.newComment = '';
    this.otherUserComment = null;
  }

  loadComments() {
    // Присоединяемся к комнате блога
    this.socket.emit(RoomsWebsocketEnum.blogRoom, this.blog.id);

    // Грузим комменты
    this.socket.emit(CommandsWebsocketBlogEnum.loadComments, this.blog.id);
  }
}
