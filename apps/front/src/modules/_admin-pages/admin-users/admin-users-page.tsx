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
import { useRouter } from 'next/router';
import { pagesNames } from '../../../pages-names';

const adminUsersStore = ioc.get<AdminUsersStore>('AdminUsersStore');

export const AdminUsersPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    adminUsersStore.init().then();
  }, []);

  return (
    <LayoutAdmin>
      <div className="flex">
        <div
          className="mb-5 cursor-pointer p-1 rounded-md bg-violet-100"
          onClick={() => router.push(`${pagesNames.adminUsers}/user`)}
        >
          <IconNewUser />
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
              <div
                className="cursor-pointer flex justify-center"
                onClick={() =>
                  router.push(`${pagesNames.adminUsers}/user?id=${user.id}`)
                }
              >
                <IconEditor />
              </div>
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
