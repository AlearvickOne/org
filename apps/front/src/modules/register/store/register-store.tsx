import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UserService } from '../../../services/user.service';
import container from '../../../../ioc/ioc';

@injectable()
export class RegisterStore {
  userService: UserService;

  message = '';

  email: string = '';
  password: string = '';

  constructor() {
    makeAutoObservable(this);
    this.userService = container.get<UserService>('UserService');
  }

  setEmail(v: string) {
    this.email = v;
  }

  setPassword(v: string) {
    this.password = v;
  }

  async register() {
    await this.userService.register({
      email: this.email,
      password: this.password,
    });
  }
}
