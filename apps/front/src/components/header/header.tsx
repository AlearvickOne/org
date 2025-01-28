import { observer } from 'mobx-react';
import ioc from '../../../ioc/ioc';
import { LoginStore } from '../../modules/login/store/login-store';
import { UserStore } from '../../main-stores/user-store';
import { useRouter } from 'next/router';
import { pagesNames } from '../../pages-names';
import { IconMenuMobile, LogoImage, useScrollDisabled } from '@org/common-next';
import { useState } from 'react';
import Link from 'next/link';
import { MobileHeaderMenu } from './mobile-header-menu';

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
              <Link href={pagesNames.account}>
                {`${userStore.user.name} ${userStore.user.surname}`}
              </Link>
              <div
                className="mr-12 cursor-pointer"
                onClick={() => loginStore.logout()}
              >
                Выход
              </div>
            </div>
          </>
        ) : (
          <Link className="mr-12 cursor-pointer" href={pagesNames.login}>
            Войти
          </Link>
        )}
      </div>

      <MobileHeaderMenu
        isOpenMobileMenu={isOpenMobileMenu}
        userStore={userStore}
        loginStore={loginStore}
      />
    </div>
  );
});
