import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import ioc from '../../../../../ioc/ioc';
import { defaultUser, UsersModel } from '@org/types';
import { UserService } from '../../../../services/user.service';

@injectable()
export class AccountStore {
  userService: UserService;

  constructor() {
    makeAutoObservable(this);
    this.userService = ioc.get<UserService>('UserService');
  }

  user: UsersModel = defaultUser;

  password = '';
  passwordCheck = '';
  isPasswordCheckError: boolean = false;
  avatar: File | null = null;
  validateErrors: any = {};

  activeTab = 0;

  tabs = [
    { id: 0, title: 'Личные данные', isActive: false },
    { id: 1, title: 'Сменить пароль', isActive: false },
  ];

  async init() {
    await this.loadUser();
    this.checkActiveTab();
  }

  async loadUser() {
    try {
      this.user = await this.userService.getMyUserAndEmail();
    } catch (error: any) {
      console.error('Ошибка при загрузке пользователя ' + error.message);
    }
  }

  setActiveTab(v: number) {
    this.activeTab = v;
    this.checkActiveTab();
  }

  checkActiveTab() {
    this.tabs.map((t) =>
      t.id === this.activeTab ? (t.isActive = true) : (t.isActive = false)
    );
  }

  setName(v: string) {
    this.user.name = v;
  }

  setSurname(v: string) {
    this.user.surname = v;
  }

  setNickname(v: string) {
    this.user.nickname = v;
  }

  setPassword(v: string) {
    this.password = v;
    this.localCheckedPassword();
  }

  setEmail(v: string) {
    this.user.email = v;
  }

  setPasswordCheck(v: string) {
    this.passwordCheck = v;
    this.localCheckedPassword();
  }

  setAvatar(v: FileList | null) {
    if (!v) {
      this.avatar = null;
      return;
    }

    this.avatar = v[0];
  }

  private localCheckedPassword() {
    if (this.passwordCheck !== this.password) {
      this.isPasswordCheckError = true;
      return;
    }
    this.isPasswordCheckError = false;
  }

  async saveUser() {
    try {
      await this.userService.saveUser(this.user, this.password, this.avatar);
      window.location.reload();
    } catch (error: any) {
      this.validateErrors = error.response?.data ?? {};
    }
  }
}
