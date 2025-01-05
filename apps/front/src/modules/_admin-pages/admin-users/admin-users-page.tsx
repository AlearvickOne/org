import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import { AdminTable, DateTimeLib, IconEditor } from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { AdminUsersStore } from './store/admin-users-store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pagesNames } from '../../../pages/pages-names';

const adminUsersStore = ioc.get<AdminUsersStore>('AdminUsersStore');

export const AdminUsersPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    adminUsersStore.init().then();
  }, []);

  return (
    <LayoutAdmin>
      <AdminTable
        heads={['id', 'Email', 'Роль', 'ФИО', 'Ник', 'Дата создания', '']}
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
                className="cursor-pointer"
                onClick={() =>
                  router.push(`${pagesNames.adminUsers}/user?id=${user.id}`)
                }
              >
                <IconEditor />
              </div>
            ),
          };
        })}
      />
    </LayoutAdmin>
  );
});
