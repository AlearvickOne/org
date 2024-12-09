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

  async init() {}

  setEmail(v: string) {
    this.email = v;
  }

  setPassword(v: string) {
    this.password = v;
  }

  async login() {
    try {
      await this.userService.login({
        email: this.email,
        password: this.password,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }
}
