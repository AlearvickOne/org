import { observer } from 'mobx-react';
import { UserStore } from '../../../../main-stores/user-store';
import { AccountStore } from '../store/account-store';
import { clsx } from 'clsx';
import { pagesNames } from '../../../../pages-names';
import { RolesEnum } from '@org/types';
import Image from 'next/image';
import { publicUrl } from '../../../../../conf';

interface Props {
  userStore: UserStore;
  accountStore: AccountStore;
}

export const MenuAccount = observer(({ userStore, accountStore }: Props) => {
  return (
    <div className="w-full bg-white h-full md:max-w-[300px] shadow-xl px-5 py-8">
      <div className="flex items-center justify-start gap-x-4">
        {userStore.user.avatar ? (
          <Image
            className="max-h-[100px] max-w-[100px] rounded-md"
            src={publicUrl + userStore.user.avatar}
            alt={'Фото'}
            width={200}
            height={200}
          />
        ) : (
          <div className="rounded-md bg-slate-400 py-1 px-8 text-h4 text-white">
            {accountStore.user.name[0]}
          </div>
        )}

        <div className="">
          <div>{`${userStore.user.name} ${userStore.user.surname}`}</div>
          <div className="font-medium">{`@${userStore.user.nickname}`}</div>
        </div>
      </div>

      <div className="border-b-1 my-2" />

      <div className="flex flex-col md:text-left text-center">
        {accountStore.user.role !== RolesEnum.user ? (
          <div>
            <a className="cursor-pointer" href={pagesNames.adminDashboard}>
              Админка
            </a>
            <div className="border-b-1 my-2" />
          </div>
        ) : null}

        {accountStore.tabs.map((tab) => (
          <div
            className={clsx(tab.isActive ? 'text-blue-500' : '')}
            key={tab.id}
          >
            <div
              onClick={() => accountStore.setActiveTab(tab.id)}
              className="cursor-pointer inline"
            >
              {tab.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
