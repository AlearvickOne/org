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
  passwordCheck: string = '';
  isPasswordCheckError: boolean = false;

  name: string = '';
  surname: string = '';
  nickname: string = '';

  errorsValidate: any = {};

  isSuccessRegister: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.userService = container.get<UserService>('UserService');
  }

  setEmail(v: string) {
    this.email = v;
  }

  setPassword(v: string) {
    this.password = v;
    this.localCheckedPassword();
  }

  setPasswordCheck(v: string) {
    this.passwordCheck = v;
    this.localCheckedPassword();
  }

  private localCheckedPassword() {
    if (this.passwordCheck !== this.password) {
      this.isPasswordCheckError = true;
      return;
    }
    this.isPasswordCheckError = false;
  }

  setName(v: string) {
    this.name = v;
  }

  setSurname(v: string) {
    this.surname = v;
  }

  setNickname(v: string) {
    this.nickname = v;
  }

  async register() {
    try {
      await this.userService.register({
        email: this.email.toLowerCase(),
        password: this.password,
        name: this.name,
        surname: this.surname,
        nickname: this.nickname,
      });

      this.setErrors({});
      this.isSuccessRegister = true;
    } catch (error: any) {
      this.setErrors(error);
      this.isSuccessRegister = false;
    }
  }

  setErrors(error: any) {
    const er = error.response?.data;
    this.errorsValidate = er ? er : {};
  }
}
