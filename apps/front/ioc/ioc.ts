import { Container } from 'inversify';
import 'reflect-metadata';
import { TestStore } from '../src/modules/test/store/test-store';
import { UserService } from '../src/services/user.service';
import { LoginStore } from '../src/modules/login/store/login-store';
import { HttpService } from '../src/services/http.service';
import { RegisterStore } from '../src/modules/register/store/register-store';

const container = new Container();

// Сторы
container.bind<TestStore>('TestStore').to(TestStore).inSingletonScope();
container.bind<LoginStore>('LoginStore').to(LoginStore).inSingletonScope();
container
  .bind<RegisterStore>('RegisterStore')
  .to(RegisterStore)
  .inSingletonScope();

// Сервисы
container.bind<HttpService>('HttpService').to(HttpService).inSingletonScope();
container.bind<UserService>('UserService').to(UserService).inSingletonScope();

export default container;
