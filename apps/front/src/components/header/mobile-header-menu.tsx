import { observer } from 'mobx-react';
import { RolesEnum } from '@org/types';
import Link from 'next/link';
import { pagesNames } from '../../pages-names';
import { UserStore } from '../../main-stores/user-store';
import { LoginStore } from '../../modules/login/store/login-store';
import Image from 'next/image';
import { publicUrl } from '../../../conf';

interface Props {
  isOpenMobileMenu: boolean;
  userStore: UserStore;
  loginStore: LoginStore;
}

export const MobileHeaderMenu = observer(
  ({ userStore, loginStore, isOpenMobileMenu }: Props) => {
    return (
      <>
        {isOpenMobileMenu ? (
          <div className="md:hidden text-h6 flex flex-col h-screen w-full fixed bg-white z-50 px-10 py-5">
            <div className="flex pb-2 gap-x-3">
              {userStore.user.avatar ? (
                <Image
                  className="max-h-[100px] max-w-[100px] rounded-md"
                  src={publicUrl + userStore.user.avatar}
                  alt={'Фото'}
                  width={100}
                  height={100}
                />
              ) : (
                <div className="rounded-md bg-slate-400 py-1 px-8 text-h4 text-white">
                  {userStore.user.name[0]}
                </div>
              )}
              <div className="text-left truncate">
                <div className="truncate">{userStore.user.name}</div>
                <div className="truncate">{userStore.user.surname}</div>
              </div>
            </div>

            <div className="border-b-1 border-blue-500 w-full" />

            <div className="py-2 flex flex-col gap-y-2">
              <Link href={pagesNames.home}>Главная</Link>
              {userStore.user.role === RolesEnum.user ? (
                <Link href={pagesNames.adminUsers}>Админка</Link>
              ) : null}
              <Link href={pagesNames.account}>Мой аккаунт</Link>
            </div>

            <div
              className="mr-12 cursor-pointer"
              onClick={() => loginStore.logout()}
            >
              Выход
            </div>
          </div>
        ) : null}
      </>
    );
  }
);
