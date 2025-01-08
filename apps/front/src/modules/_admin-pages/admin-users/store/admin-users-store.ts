import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { defaultUser, RolesModel, UsersModel } from '@org/types/models';
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

  roles: { value: string; label: string }[] = [{ value: '', label: '' }];
  role: { value: string; label: string } = this.roles[0];

  isButtonSaveDisabled = false;

  errors: any = {};

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  async init() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.adminService.getAllUsers();
  }

  async loadUser(id?: string) {
    this.user = defaultUser;
    this.role = { value: '', label: '' };

    if (!id) {
      return;
    }

    this.user = await this.adminService.getUser(id);
    this.role = this.roles.find((role) => role.value == this.user.role)!;
  }

  async loadRoles() {
    const roles: RolesModel[] = await this.adminService.getRoles();

    this.roles = roles.map((role) => {
      return { value: role.role, label: role.name };
    });
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

  setRole(v: { value: string; label: string }) {
    this.role = v;
    this.user.role = this.role.value;
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
    } catch (error: any) {
      this.errors = error.response.data;
    }
  }

  async userArchived(userId: number, isArchived: boolean) {
    try {
      await this.adminService.userArchived(userId, isArchived);
      return isArchived;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(userId: number) {
    if (!confirm('Вы точно хотите удалить этого пользователя?')) {
      return;
    }

    try {
      await this.adminService.deleteUser(userId);
      window.location.replace(`${pagesNames.adminUsers}`);
    } catch (error: any) {
      console.log(error);
    }
  }
}
