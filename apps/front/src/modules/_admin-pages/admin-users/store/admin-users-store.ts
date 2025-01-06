import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import {
  defaultUser,
  UsersModel,
} from '../../../../../../../types/models/users.model';
import { AdminService } from '../../../../services/admin.service';
import ioc from '../../../../../ioc/ioc';
import { pagesNames } from '../../../../pages/pages-names';

@injectable()
export class AdminUsersStore {
  adminService: AdminService;

  users: UsersModel[] = [];

  user: UsersModel = defaultUser;

  password = '';
  passwordCheck = '';

  isButtonSaveDisabled = false;

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  async init() {
    await this.loadUsers();
    console.log(this.users);
  }

  async loadUsers() {
    this.users = await this.adminService.getAllUsers();
  }

  async loadUser(id?: string) {
    this.user = defaultUser;

    if (!id) {
      return;
    }

    this.user = await this.adminService.getUser(id);
  }

  setName(v: string) {
    this.user.name = v;
  }

  setSurname(v: string) {
    this.user.surname = v;
  }

  setEmail(v: string) {
    this.user.email = v;
  }

  setNickname(v: string) {
    this.user.nickname = v;
  }

  setPassword(v: string) {
    this.password = v;
    this.checkerPassword();
  }

  setPasswordCheck(v: string) {
    this.passwordCheck = v;
    this.checkerPassword();
  }

  checkerPassword() {
    this.isButtonSaveDisabled = this.passwordCheck !== this.password;
  }

  async saveEditUser() {
    try {
      if (this.password !== '') {
        this.user = { ...this.user, password: this.password };
      }

      const userId = await this.adminService.saveEditUser(this.user);
      window.location.replace(`${pagesNames.adminUsers}/user?id=${userId}`);
    } catch (error) {
      console.log(error);
    }
  }
}
