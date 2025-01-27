import { observer } from 'mobx-react';
import ioc from '../../../ioc/ioc';
import { LoginStore } from '../../modules/login/store/login-store';
import { UserStore } from '../../main-stores/user-store';
import { useRouter } from 'next/router';
import { pagesNames } from '../../pages-names';
import { IconMenuMobile, LogoImage, useScrollDisabled } from '@org/common-next';
import { useState } from 'react';

const loginStore = ioc.get<LoginStore>('LoginStore');
const userStore = ioc.get<UserStore>('UserStore');

export const Header = observer(() => {
  const router = useRouter();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);

  useScrollDisabled(isOpenMobileMenu);

  return (
    <div>
      <div className="bg-white h-[60px] flex md:justify-between justify-center items-center border-b-1 shadow-xl relative">
        <div
          className="md:ml-12 cursor-pointer"
          onClick={() => router.push(pagesNames.home)}
        >
          <div className="w-full h-[50px] text-black">
            <LogoImage />
          </div>
        </div>

        <div
          className="block md:hidden absolute right-[20px]"
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        >
          <IconMenuMobile />
        </div>

        {userStore.user ? (
          <>
            <ul className="hidden md:flex items-center">
              <li
                className="cursor-pointer"
                onClick={() => router.push(pagesNames.dashboard)}
              >
                Dashboard
              </li>
            </ul>

            <div className="hidden md:flex gap-x-12">
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
            className="hidden md:flex mr-12 cursor-pointer"
            onClick={() => router.push(pagesNames.login)}
          >
            Войти
          </div>
        )}
      </div>

      {isOpenMobileMenu ? (
        <div className="md:hidden block h-screen w-full fixed bg-white z-50"></div>
      ) : null}
    </div>
  );
});
