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
  name: string = '';
  surname: string = '';
  phone: string = '';

  errorsValidate: any = {};

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

  setName(v: string) {
    this.name = v;
  }

  setSurname(v: string) {
    this.surname = v;
  }

  setPhone(v: string) {
    this.phone = v;
  }

  async register() {
    try {
      await this.userService.register({
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname,
        phone: this.phone,
      });
    } catch (error: any) {
      this.setErrors(error);
    }
  }

  setErrors(error: any) {
    const er = error.response.data;
    this.errorsValidate = er ? er : {};
  }
}
