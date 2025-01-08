import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../../components/layout-admin';
import ioc from '../../../../../ioc/ioc';
import { AdminUsersStore } from '../store/admin-users-store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminUserEditCommon } from './admin-user-edit-common';
import { AdminUserEditPassword } from './admin-user-edit-password';

const adminUsersStore = ioc.get<AdminUsersStore>('AdminUsersStore');

export const AdminUserEdit = observer(() => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    adminUsersStore.loadRoles().then();
  }, []);

  const router = useRouter();

  const tabs = [
    {
      title: 'Общее',
      component: <AdminUserEditCommon adminUsersStore={adminUsersStore} />,
    },
    {
      title: 'Пароль',
      component: <AdminUserEditPassword adminUsersStore={adminUsersStore} />,
    },
  ];

  useEffect(() => {
    adminUsersStore.loadUser(router.query.id as string).then();
  }, [router.query]);

  const name = adminUsersStore.user.name;
  const surname = adminUsersStore.user.surname;
  const nickname = adminUsersStore.user.nickname;

  const userFio = `${name} ${surname} ${nickname && `- ( ${nickname} )`}`;

  return (
    <LayoutAdmin
      titleHead={userFio}
      tabs={tabs}
      tabIndex={tabIndex}
      setTabIndex={(v) => setTabIndex(v)}
    >
      {tabs[tabIndex].component}
    </LayoutAdmin>
  );
});
