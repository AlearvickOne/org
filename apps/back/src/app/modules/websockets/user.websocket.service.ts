import { Injectable } from '@nestjs/common';
import { UsersCommentsEntity } from '../../database/entities/users_comments.entity';
import { CommandsWebsocketBlogEnum, RoomsWebsocketEnum } from '@org/types';
import { Server } from 'socket.io';

@Injectable()
export class UserWebSocketService {
  constructor() {}

  async returnedCommentsBlogById(serverSocket: Server, blogId: number) {
    const comments = await UsersCommentsEntity.findBy({
      blog_id: blogId,
    });

    const commentsToObject = comments.map((c) => ({
      ...c,
      body: JSON.parse(c.body),
    }));

    serverSocket
      .to(`${RoomsWebsocketEnum.blogRoom}_${blogId}`)
      .emit(CommandsWebsocketBlogEnum.returnedComments, commentsToObject);
  }
}
