import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import {
  defaultUser,
  UsersModel,
} from '../../../../../../../types/models/users.model';
import { AdminService } from '../../../../services/admin.service';
import ioc from '../../../../../ioc/ioc';
import { pagesNames } from '../../../../pages/pages-names';
import { IconClipboard, IconMonitor, IconUsers } from '@org/common-next';

@injectable()
export class AdminUsersStore {
  adminService: AdminService;

  users: UsersModel[] = [];

  user: UsersModel = defaultUser;

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
}
