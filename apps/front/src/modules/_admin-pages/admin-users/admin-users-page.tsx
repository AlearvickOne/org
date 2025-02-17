import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import {
  AdminTable,
  DateTimeLib,
  IconEditor,
  IconMinusSquare,
  IconNewUser,
  IconPlusSquare,
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
    </LayoutAdmin>
  );
});
