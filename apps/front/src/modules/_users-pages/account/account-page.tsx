import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';
import { MenuAccount } from './components/menu-account';
import { UserStore } from '../../../main-stores/user-store';
import ioc from '../../../../ioc/ioc';
import { PersonalData } from './components/personal-data';
import { AccountStore } from './store/account-store';
import { useEffect } from 'react';
import { PasswordChange } from './components/password-change';
import { pagesNames } from '../../../pages-names';
import { BreadCrumbs } from '@org/common-next';
import { useRouter } from 'next/router';

const userStore = ioc.get<UserStore>('UserStore');
const accountStore = ioc.get<AccountStore>('AccountStore');

export const AccountPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    accountStore.init().then();
  }, []);

  const activeTab = (tabNumber: number) => {
    switch (tabNumber) {
      case 0:
        return <PersonalData accountStore={accountStore} />;
      case 1:
        return <PasswordChange accountStore={accountStore} />;
      default:
        return null;
    }
  };

  return (
    <LayoutUser>
      <BreadCrumbs
        router={router}
        crumbs={[
          { name: 'Главная', link: pagesNames.home },
          { name: 'Мой аккаунт', link: pagesNames.account },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-0 md:gap-x-[50px]">
        <MenuAccount userStore={userStore} accountStore={accountStore} />

        <div className="w-full">{activeTab(accountStore.activeTab)}</div>
      </div>
    </LayoutUser>
  );
});
