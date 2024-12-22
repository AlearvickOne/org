import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { UserStore } from '../../../../main-stores/user-store';
import ioc from '../../../../../ioc/ioc';
import {
  defaultUser,
  UsersModel,
} from '../../../../../../../types/models/users.model';
import { UserService } from '../../../../services/user.service';

@injectable()
export class AccountStore {
  userStore: UserStore;
  userService: UserService;

  constructor() {
    makeAutoObservable(this);
    this.userStore = ioc.get<UserStore>('UserStore');
    this.userService = ioc.get<UserService>('UserService');
  }

  user: UsersModel = defaultUser;

  password = '';
  checkedPassword = '';

  activeTab = 0;

  tabs = [
    { id: 0, title: 'Личные данные', isActive: false },
    { id: 1, title: 'Личные данные1', isActive: false },
    { id: 2, title: 'Личные данные2', isActive: false },
  ];

  async init() {
    await this.loadUser();
    this.checkActiveTab();
  }

  async loadUser() {
    this.user = { ...this.userStore.user };
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

  setPassword(v: string) {
    this.password = v;
  }

  setCheckedPassword(v: string) {
    this.checkedPassword = v;
  }

  async saveUser() {
    try {
      await this.userService.saveUser(this.user, this.password);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
