import { Server, Socket } from 'socket.io';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { IUsersComments } from '@org/types';

@Injectable()
export class UserWebSocket implements OnModuleInit {
  constructor() {}
  io: Server;

  comments: IUsersComments[] = [];

  async onModuleInit() {
    this.io = new Server(3900, {
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    });

    this.io.on('connection', (socket) => {
      Logger.debug('Socket connected');

      this.events(socket);

      socket.on('disconnect', () => {
        Logger.debug(`Socket disconnected`);
      });
    });
  }

  events(socket: Socket) {
    socket.on('comment', (data) => {
      this.comments.push(data);
      this.io.emit('commented', this.comments);
    });
  }
}
