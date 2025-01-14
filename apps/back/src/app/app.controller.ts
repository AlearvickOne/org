import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Server } from 'socket.io';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('socket-server')
  async socketServer() {
    const io = new Server({});
  }
}
