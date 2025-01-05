import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { UsersModel } from '../../../../../../../types/models/users.model';
import { AdminService } from '../../../../services/admin.service';
import ioc from '../../../../../ioc/ioc';

@injectable()
export class AdminUsersStore {
  adminService: AdminService;

  users: UsersModel[] = [];

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
}
