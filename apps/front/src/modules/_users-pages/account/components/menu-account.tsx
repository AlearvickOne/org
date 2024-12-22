import { observer } from 'mobx-react';
import { UserStore } from '../../../../main-stores/user-store';
import { AccountStore } from '../store/account-store';
import { clsx } from 'clsx';

interface Props {
  userStore: UserStore;
  accountStore: AccountStore;
}

export const MenuAccount = observer(({ userStore, accountStore }: Props) => {
  return (
    <div className="w-full max-w-[250px] border-1 px-5 py-8">
      <div className="">
        <div>{`${userStore.user.name} ${userStore.user.surname}`}</div>
        <div>{`${userStore.user.nickname}`}</div>
      </div>

      <div className="border-b-1 my-5"></div>

      <div className="">
        <ul>
          {accountStore.tabs.map((tab) => (
            <li
              className={clsx(
                `cursor-pointer`,
                tab.isActive ? 'text-blue-500' : ''
              )}
              key={tab.id}
              onClick={() => accountStore.setActiveTab(tab.id)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
