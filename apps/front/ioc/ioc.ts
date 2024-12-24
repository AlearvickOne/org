import { Container } from 'inversify';
import 'reflect-metadata';
import { UserService } from '../src/services/user.service';
import { LoginStore } from '../src/modules/login/store/login-store';
import { HttpService } from '../src/services/http.service';
import { RegisterStore } from '../src/modules/register/store/register-store';
import { UserStore } from '../src/main-stores/user-store';
import { AccountStore } from '../src/modules/_users-pages/account/store/account-store';
import { AdminStore } from '../src/main-stores/admin-store';

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

// Сервисы
container.bind<HttpService>('HttpService').to(HttpService).inSingletonScope();
container.bind<UserService>('UserService').to(UserService).inSingletonScope();

export default container;
