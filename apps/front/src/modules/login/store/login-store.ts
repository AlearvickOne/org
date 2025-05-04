import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UserService } from '../../../services/user.service';
import container from '../../../../ioc/ioc';
import { pagesNames } from '../../../pages-names';

@injectable()
export class LoginStore {
  userService: UserService;

  message = '';

  email: string = '';
  password: string = '';

  errorsValidate: any = {};
  error: string = '';

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

  async login() {
    try {
      await this.userService.login({
        email: this.email.toLowerCase(),
        password: this.password,
      });
      window.location.replace(`http://localhost:4200/${pagesNames.home}`);
    } catch (error: any) {
      this.setErrors(error);
    }
  }

  async logout() {
    await this.userService.logout();
    window.location.reload();
  }

  setErrors(error: any) {
    const er = error.response.data;
    this.errorsValidate = er ? er : {};
    this.error = er.message;
  }
}
