import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UserService } from '../../../services/user.service';
import container from '../../../../ioc/ioc';

@injectable()
export class LoginStore {
  userService: UserService;

  message = '';

  email: string = '';
  password: string = '';

  constructor() {
    makeAutoObservable(this);
    this.userService = container.get<UserService>('UserService');
  }

  async init() {
    await this.getMessage();
  }

  async getMessage() {
    this.message = await this.userService.getMessage();
  }

  setEmail(v: string) {
    this.email = v;
  }

  setPassword(v: string) {
    this.password = v;
  }

  async login() {}
}
