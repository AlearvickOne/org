import { Container } from 'inversify';
import 'reflect-metadata';
import { UserService } from '../src/services/user.service';
import { LoginStore } from '../src/modules/login/store/login-store';
import { HttpService } from '../src/services/http.service';
import { RegisterStore } from '../src/modules/register/store/register-store';
import { UserStore } from '../src/main-stores/user-store';
import { AccountStore } from '../src/modules/_users-pages/account/store/account-store';
import { AdminStore } from '../src/main-stores/admin-store';
import { AdminUsersStore } from '../src/modules/_admin-pages/admin-users/store/admin-users-store';
import { AdminService } from '../src/services/admin.service';

const container = new Container();

// Сторы
container.bind<LoginStore>('LoginStore').to(LoginStore).inSingletonScope();
container
  .bind<RegisterStore>('RegisterStore')
  .to(RegisterStore)
  .inSingletonScope();
container.bind<UserStore>('UserStore').to(UserStore).inSingletonScope();
container
  .bind<AccountStore>('AccountStore')
  .to(AccountStore)
  .inSingletonScope();
container.bind<AdminStore>('AdminStore').to(AdminStore).inSingletonScope();
container
  .bind<AdminUsersStore>('AdminUsersStore')
  .to(AdminUsersStore)
  .inSingletonScope();

// Сервисы
container.bind<HttpService>('HttpService').to(HttpService).inSingletonScope();
container.bind<UserService>('UserService').to(UserService).inSingletonScope();
container
  .bind<AdminService>('AdminService')
  .to(AdminService)
  .inSingletonScope();

export default container;
