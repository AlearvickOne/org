import { observer } from 'mobx-react';
import ioc from '../../../ioc/ioc';
import { LoginStore } from '../../modules/login/store/login-store';
import { UserStore } from '../../main-stores/user-store';
import { useRouter } from 'next/router';
import { pagesNames } from '../../pages-names';
import { LogoImage } from '@org/common-next';

const loginStore = ioc.get<LoginStore>('LoginStore');
const userStore = ioc.get<UserStore>('UserStore');

export const Header = observer(() => {
  const router = useRouter();

  return (
    <div className="bg-white h-[60px] flex justify-between items-center border-b-1 shadow-xl">
      <div
        className="ml-12 cursor-pointer"
        onClick={() => router.push(pagesNames.home)}
      >
        <div className="w-full h-[50px] text-black">
          <LogoImage />
        </div>
      </div>

      {userStore.user ? (
        <>
          <ul className="flex items-center">
            <li
              className="cursor-pointer"
              onClick={() => router.push(pagesNames.dashboard)}
            >
              Dashboard
            </li>
          </ul>

          <div className="flex gap-x-12">
            <div
              className="cursor-pointer"
              onClick={() => router.push(pagesNames.account)}
            >
              {`${userStore.user.name} ${userStore.user.surname}`}
            </div>
            <div
              className="mr-12 cursor-pointer"
              onClick={() => loginStore.logout()}
            >
              Выход
            </div>
          </div>
        </>
      ) : (
        <div
          className="mr-12 cursor-pointer"
          onClick={() => router.push(pagesNames.login)}
        >
          Войти
        </div>
      )}
    </div>
  );
});
