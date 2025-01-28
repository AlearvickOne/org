import { observer } from 'mobx-react';
import { RolesEnum } from '@org/types';
import Link from 'next/link';
import { pagesNames } from '../../pages-names';
import { UserStore } from '../../main-stores/user-store';
import { LoginStore } from '../../modules/login/store/login-store';

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
            <div className="cursor-pointer pb-2 text-center">
              {`${userStore.user.name} ${userStore.user.surname}`}
            </div>

            <div className="border-b-1 border-blue-500 w-full" />

            <div className="py-2 flex flex-col gap-y-2">
              {userStore.user.role === RolesEnum.user ? (
                <Link href={pagesNames.adminUsers}>Админка</Link>
              ) : null}
              <Link href={pagesNames.account}>Мой аккаунт</Link>
            </div>

            <div
              className="mr-12 cursor-pointer pt-2"
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
