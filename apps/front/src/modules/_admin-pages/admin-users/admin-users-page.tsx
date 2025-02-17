import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import {
  AdminTable,
  DateTimeLib,
  IconEditor,
  IconMinusSquare,
  IconNewUser,
  IconPlusSquare,
  InputSearch,
  PaginatorBase,
} from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { AdminUsersStore } from './store/admin-users-store';
import { useEffect } from 'react';
import { pagesNames } from '../../../pages-names';
import Link from 'next/link';

const adminUsersStore = ioc.get<AdminUsersStore>('AdminUsersStore');

export const AdminUsersPage = observer(() => {
  useEffect(() => {
    adminUsersStore.init().then();
  }, []);

  return (
    <LayoutAdmin>
      <div className="flex">
        <Link
          className="mb-5 cursor-pointer p-1 rounded-md bg-violet-100"
          href={pagesNames.adminUsers + `/user`}
        >
          <IconNewUser />
        </Link>
      </div>

      <div className="mb-5 flex w-full gap-5 justify-center md:flex-row flex-col">
        <div className="md:w-[300px]">
          <InputSearch
            type={'text'}
            value={adminUsersStore.searchUserById}
            onChange={(v) => adminUsersStore.setSearchUserById(v)}
            onClickSearch={() => adminUsersStore.loadUsers()}
            maxLength={5}
            placeholder="Поиск по id пользователя"
          />
        </div>
        <div className="md:w-[300px]">
          <InputSearch
            type={'text'}
            value={adminUsersStore.searchUserByEmail}
            onChange={(v) => adminUsersStore.setSearchUserByEmail(v)}
            onClickSearch={() => adminUsersStore.loadUsers()}
            maxLength={20}
            placeholder="Поиск по email"
          />
        </div>
        <div className="md:w-[300px]">
          <InputSearch
            type={'text'}
            value={adminUsersStore.searchUserByNickname}
            onChange={(v) => adminUsersStore.setSearchUserByNickname(v)}
            onClickSearch={() => adminUsersStore.loadUsers()}
            maxLength={10}
            placeholder="Поиск по нику"
          />
        </div>
      </div>

      <AdminTable
        heads={[
          'id',
          'Email',
          'Роль',
          'ФИО',
          'Ник',
          'Дата создания',
          '',
          'Архив',
        ]}
        bodys={adminUsersStore.users.map((user) => {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            fio: user.name + ' ' + user.surname,
            nickname: user.nickname,
            createdAt: DateTimeLib.mySqlDatetimeToString(user.created_at),
            btnEditor: (
              <Link
                className="cursor-pointer flex justify-center"
                href={pagesNames.adminUsers + `/user?id=${user.id}`}
              >
                <IconEditor />
              </Link>
            ),
            btnToArchived: (
              <div
                className="cursor-pointer flex justify-center"
                onClick={() =>
                  adminUsersStore
                    .userArchived(user.id, !user.is_archived)
                    .then((w) => (user.is_archived = w))
                }
              >
                {user.is_archived ? <IconMinusSquare /> : <IconPlusSquare />}
              </div>
            ),
          };
        })}
      />

      <div className="flex justify-center mt-3 text-[18px]">
        <PaginatorBase
          page={adminUsersStore.page}
          quantityPages={adminUsersStore.quantityPages}
          setPage={(v) => adminUsersStore.setPage(v)}
        />
      </div>
    </LayoutAdmin>
  );
});
