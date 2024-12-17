import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { defaultUser, UsersModel } from '../../../../types/models/users.model';
import { UserService } from '../services/user.service';
import container from '../../ioc/ioc';

@injectable()
export class UserStore {
  userService: UserService;

  user: UsersModel = defaultUser;

  constructor() {
    makeAutoObservable(this);
    this.userService = container.get<UserService>('UserService');
  }

  async loadUser() {
    try {
      this.user = await this.userService.getMyUser();
    } catch (error) {
      throw error;
    }
  }
}
