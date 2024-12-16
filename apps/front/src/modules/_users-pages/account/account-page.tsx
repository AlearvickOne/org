import { observer } from 'mobx-react';
import { Layout } from '../../../components/layout';
import { MenuAccount } from './components/menu-account';
import { UserStore } from '../../../main-stores/user-store';
import ioc from '../../../../ioc/ioc';
import { PersonalData } from './components/personal-data';
import { AccountStore } from './store/account-store';
import { useEffect } from 'react';

const userStore = ioc.get<UserStore>('UserStore');
const accountStore = ioc.get<AccountStore>('AccountStore');

export const AccountPage = observer(() => {
  useEffect(() => {
    accountStore.init().then();
  }, []);

  const activeTab = (tabNumber: number) => {
    switch (tabNumber) {
      case 0:
        return <PersonalData accountStore={accountStore} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex gap-x-20">
        <MenuAccount userStore={userStore} accountStore={accountStore} />

        {activeTab(accountStore.activeTab)}
      </div>
    </Layout>
  );
});
