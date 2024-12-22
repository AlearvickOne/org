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
    <div className="w-full h-full max-w-[300px] border-1 border-blue-500 rounded-[20px] px-5 py-8">
      <div className="flex items-center justify-center gap-x-10">
        <div className="">Фото</div>
        <div className="">
          <div>{`${userStore.user.name} ${userStore.user.surname}`}</div>
          <div className="font-medium">{`Ваш ник: ${userStore.user.nickname}`}</div>
        </div>
      </div>

      <div className="border-b-1 my-5"></div>

      <div className="flex flex-col justify-center items-center">
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
