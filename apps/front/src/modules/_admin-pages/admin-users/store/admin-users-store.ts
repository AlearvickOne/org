import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import {
  defaultComboBox,
  defaultUser,
  IComboBox,
  RolesModel,
  UsersModel,
} from '@org/types';
import { AdminService } from '../../../../services/admin.service';
import ioc from '../../../../../ioc/ioc';
import { pagesNames } from '../../../../pages-names';

@injectable()
export class AdminUsersStore {
  adminService: AdminService;

  users: UsersModel[] = [];

  user: UsersModel = defaultUser;

  password = '';
  passwordCheck = '';

  roles: IComboBox[] = [defaultComboBox];
  role: IComboBox = defaultComboBox;

  isButtonSaveDisabled = false;

  errors: any = {};

  searchUserById: string = '';
  searchUserByEmail: string = '';
  searchUserByNickname: string = '';

  page: number = 1;
  take: number = 20;
  quantityPages = 0;

  constructor() {
    makeAutoObservable(this);
    this.adminService = ioc.get<AdminService>('AdminService');
  }

  async init() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      const [users, count] = await this.adminService.getAllUsers(
        this.searchUserById,
        this.searchUserByEmail,
        this.searchUserByNickname,
        this.page,
        this.take
      );

      this.users = users;
      this.quantityPages = Math.ceil(count / this.take);
    } catch (error: any) {
      alert('Ошибка при загрузке списка пользователей - ' + error.message);
    }
  }

  async loadUser(id?: string) {
    try {
      this.user = defaultUser;
      this.role = defaultComboBox;

      if (!id) {
        return;
      }

      this.user = await this.adminService.getUser(id);
      this.role = this.roles.find((role) => role.value == this.user.role)!;
    } catch (error: any) {
      alert(`Ошибка при загрузке пользователя №${id} - ` + error.message);
    }
  }

  async loadRoles() {
    try {
      const roles: RolesModel[] = await this.adminService.getRoles();

      this.roles = roles.map((role) => {
        return { value: role.role, label: role.name };
      });
    } catch (error: any) {
      alert(`Ошибка при загрузке ролей - ` + error.message);
    }
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

  setRole(v: IComboBox) {
    this.role = v;
    this.user.role = this.role.value;
  }

  checkerPassword() {
    this.isButtonSaveDisabled = this.passwordCheck !== this.password;
  }

  setSearchUserById(v: string) {
    this.searchUserById = v;
  }

  setSearchUserByEmail(v: string) {
    this.searchUserByEmail = v;
  }

  setSearchUserByNickname(v: string) {
    this.searchUserByNickname = v;
  }

  setPage(v: number) {
    this.page = v;
    this.loadUsers().then();
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
      await this.loadUsers().then();
    } catch (error: any) {
      alert(`Ошибка при бане пользователя №${userId}` + error.message);
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
      alert(`Ошибка при удалении пользователя №${userId}` + error.message);
    }
  }
}
