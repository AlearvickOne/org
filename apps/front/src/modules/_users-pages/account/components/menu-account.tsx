import { observer } from 'mobx-react';
import { UserStore } from '../../../../main-stores/user-store';
import { AccountStore } from '../store/account-store';
import { clsx } from 'clsx';
import { pagesNames } from '../../../../pages-names';
import Link from 'next/link';

interface Props {
  userStore: UserStore;
  accountStore: AccountStore;
}

export const MenuAccount = observer(({ userStore, accountStore }: Props) => {
  return (
    <div className="w-full bg-white h-full max-w-[300px] shadow-xl px-5 py-8">
      <div className="flex items-center justify-center gap-x-10">
        <div className="">Фото</div>
        <div className="">
          <div>{`${userStore.user.name} ${userStore.user.surname}`}</div>
          <div className="font-medium">{`Ваш ник: ${userStore.user.nickname}`}</div>
        </div>
      </div>

      <div className="border-b-1 my-5" />

      <div className="flex flex-col">
        <ul>
          <li>
            <a className="cursor-pointer" href={pagesNames.adminDashboard}>
              Админка
            </a>
          </li>
          {accountStore.tabs.map((tab) => (
            <li
              className={clsx(tab.isActive ? 'text-blue-500' : '')}
              key={tab.id}
            >
              <div
                onClick={() => accountStore.setActiveTab(tab.id)}
                className="cursor-pointer inline"
              >
                {tab.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
