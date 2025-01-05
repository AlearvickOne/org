import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import { AdminTable } from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { AdminUsersStore } from './store/admin-users-store';
import { useEffect } from 'react';

const adminUsersStore = ioc.get<AdminUsersStore>('AdminUsersStore');

export const AdminUsersPage = observer(() => {
  useEffect(() => {
    adminUsersStore.init().then();
  }, []);

  return (
    <LayoutAdmin>
      <AdminTable
        heads={['id', 'Email', 'Роль', 'ФИО', 'Ник', 'Дата создания']}
        bodys={adminUsersStore.users.map((user) => {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            fio: user.name + ' ' + user.surname,
            nickname: user.nickname,
            createdAt: new Date(user.created_at!).toLocaleDateString(),
          };
        })}
      />
    </LayoutAdmin>
  );
});
