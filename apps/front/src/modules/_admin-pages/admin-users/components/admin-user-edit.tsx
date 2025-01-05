import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../../components/layout-admin';
import ioc from '../../../../../ioc/ioc';
import { AdminUsersStore } from '../store/admin-users-store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { InputBase } from '@org/common-next';

const adminUsersStore = ioc.get<AdminUsersStore>('AdminUsersStore');

export const AdminUserEdit = observer(() => {
  const router = useRouter();

  useEffect(() => {
    adminUsersStore.loadUser(router.query.id as string).then();
  }, [router.query]);

  const userFio = `${adminUsersStore.user.name} ${adminUsersStore.user.surname} - ( ${adminUsersStore.user.nickname} )`;

  return (
    <LayoutAdmin titleHead={userFio}>
      <div className="grid grid-rows-2 grid-cols-2 gap-x-8 gap-y-5">
        <InputBase
          label={'Имя'}
          type={'text'}
          value={adminUsersStore.user.name}
          placeholder={'Введите имя пользователя'}
          onChange={(v) => adminUsersStore.setName(v)}
        />
        <InputBase
          label={'Фамилия'}
          type={'text'}
          value={adminUsersStore.user.surname}
          placeholder={'Введите фамилию пользователя'}
          onChange={(v) => {
            adminUsersStore.setSurname(v);
          }}
        />

        <InputBase
          label={'Ник'}
          type={'text'}
          value={adminUsersStore.user.nickname}
          placeholder={'Введите ник пользователя'}
          onChange={(v) => adminUsersStore.setNickname(v)}
        />
        <InputBase
          label={'Email'}
          type={'text'}
          value={adminUsersStore.user.email}
          placeholder={'Введите email пользователя'}
          onChange={(v) => adminUsersStore.setEmail(v)}
        />
      </div>
    </LayoutAdmin>
  );
});
