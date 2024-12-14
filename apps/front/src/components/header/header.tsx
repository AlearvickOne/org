import { observer } from 'mobx-react';
import ioc from '../../../ioc/ioc';
import { LoginStore } from '../../modules/login/store/login-store';
import { UserStore } from '../../main-stores/user-store';

const loginStore = ioc.get<LoginStore>('LoginStore');
const userStore = ioc.get<UserStore>('UserStore');

export const Header = observer(() => {
  return (
    <div className="bg-white h-[50px] flex justify-between items-center">
      <div className="ml-12 cursor-pointer">Лого</div>

      <ul className="flex items-center">
        <li>меню1</li>
        <li>меню2</li>
        <li>меню3</li>
        <li>меню4</li>
        <li>меню5</li>
      </ul>

      <div className="flex gap-x-12">
        <div className="cursor-pointer">
          {`${userStore.user.name} ${userStore.user.surname}`}
        </div>
        <div
          className="mr-12 cursor-pointer"
          onClick={() => loginStore.logout()}
        >
          Выход
        </div>
      </div>
    </div>
  );
});
