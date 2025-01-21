import { Server, Socket } from 'socket.io';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersCommentsEntity } from '../../database/entities/users_comments.entity';
import {
  CommandsWebsocketBlogEnum,
  IUsersComments,
  RoomsWebsocketEnum,
} from '@org/types';
import { UserWebSocketService } from './user.websocket.service';

@Injectable()
export class UserWebSocket implements OnModuleInit {
  constructor(private readonly UserWebsocketService: UserWebSocketService) {}
  serverSocket: Server;

  async onModuleInit() {
    this.serverSocket = new Server(3900, {
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    });

    this.serverSocket.on('connection', async (socket) => {
      Logger.debug('Socket connected');

      await this.events(socket);

      socket.on('disconnect', () => {
        Logger.debug(`Socket disconnected`);
      });
    });
  }

  async events(socket: Socket) {
    socket.on(RoomsWebsocketEnum.blogRoom, (blogId: number) => {
      socket.join(`${RoomsWebsocketEnum.blogRoom}_${blogId}`);
    });

    await this.loadComments(socket);
    await this.saveNewComment(socket);
  }

  async loadComments(socket: Socket) {
    socket.on(
      CommandsWebsocketBlogEnum.loadComments,
      async (blogId: number) => {
        await this.UserWebsocketService.returnedCommentsBlogById(
          this.serverSocket,
          blogId
        );
      }
    );
  }

  async saveNewComment(socket: Socket) {
    socket.on(
      CommandsWebsocketBlogEnum.newComment,
      async (data: { blogId: number; body: IUsersComments }) => {
        const newComment = new UsersCommentsEntity();
        newComment.blog_id = data.blogId;
        newComment.body = JSON.stringify(data.body);
        await newComment.save();

        await this.UserWebsocketService.returnedCommentsBlogById(
          this.serverSocket,
          data.blogId
        );
      }
    );
  }
}
