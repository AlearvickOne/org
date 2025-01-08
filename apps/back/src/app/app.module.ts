import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController, AuthController, AdminController],
  providers: [
    AppService,
    UserService,
    AuthService,
    ConfigService,
    AdminService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
