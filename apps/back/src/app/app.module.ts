import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { ConfigService } from '../services/config.service';
import { AdminController } from './modules/admin/admin.controller';
import { AdminService } from './modules/admin/admin.service';
import { UserWebSocket } from './modules/websockets/user.websocket';
import { UserWebSocketService } from './modules/websockets/user.websocket.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards';
import { RedisCustomModule } from './modules/redis/redis.custom.module';

const guards = [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];

@Module({
  imports: [DatabaseModule, RedisCustomModule],
  controllers: [AppController, UserController, AuthController, AdminController],
  providers: [
    AppService,
    UserService,
    AuthService,
    ConfigService,
    AdminService,
    UserWebSocket,
    UserWebSocketService,
    ...guards,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
