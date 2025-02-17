import { observer } from 'mobx-react';
import ioc from '../../../ioc/ioc';
import { LoginStore } from '../../modules/login/store/login-store';
import { UserStore } from '../../main-stores/user-store';
import { pagesNames } from '../../pages-names';
import { IconMenuMobile, LogoImage, useScrollDisabled } from '@org/common-next';
import { useState } from 'react';
import Link from 'next/link';
import { MobileHeaderMenu } from './mobile-header-menu';
import Image from 'next/image';
import { publicUrl } from '../../../conf';

const loginStore = ioc.get<LoginStore>('LoginStore');
const userStore = ioc.get<UserStore>('UserStore');

export const Header = observer(() => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);

  useScrollDisabled(isOpenMobileMenu);

  return (
    <div>
      <div className="bg-white h-[60px] flex md:justify-between justify-center items-center border-b-1 shadow-xl relative">
        <Link className="md:ml-12 cursor-pointer" href={pagesNames.home}>
          <div className="w-full h-[50px] text-black">
            <LogoImage />
          </div>
        </Link>

        <div
          className="block md:hidden absolute right-[20px]"
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        >
          <IconMenuMobile />
        </div>

        {userStore.user ? (
          <>
            <div className="hidden md:flex gap-x-12 items-center">
              <Link
                href={pagesNames.account}
                className="flex gap-x-2 items-center"
              >
                {userStore.user.avatar ? (
                  <Image
                    className="max-h-[40px] max-w-[40px] rounded-md"
                    src={publicUrl + userStore.user.avatar}
                    alt={'Фото'}
                    width={150}
                    height={150}
                  />
                ) : (
                  <div className="rounded-md bg-slate-400 py-1 px-8 text-h4 text-white">
                    {userStore.user.name[0]}
                  </div>
                )}
                <div className="text-left">
                  <div className="flex gap-x-2 max-w-[200px] truncate">
                    <div className="truncate">{userStore.user.name} </div>
                    <div className="truncate">{userStore.user.surname}</div>
                  </div>
                  Мой аккаунт
                </div>
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
