import { observer } from 'mobx-react';
import { Button, InputBase } from '@org/common-next';
import { AdminUsersStore } from '../store/admin-users-store';

interface Props {
  adminUsersStore: AdminUsersStore;
}

export const AdminUserEditPassword = observer(({ adminUsersStore }: Props) => {
  return (
    <div className="px-3">
      <div className="grid grid-rows-2 grid-cols-2 gap-x-8 gap-y-5">
        <InputBase
          label={'Пароль'}
          type={'text'}
          value={adminUsersStore.user.name}
          placeholder={'Введите пароль'}
          onChange={(v) => adminUsersStore.setName(v)}
        />
        <InputBase
          label={'Подтверждение пароля'}
          type={'text'}
          value={adminUsersStore.user.surname}
          placeholder={'Повторите пароль'}
          onChange={(v) => {
            adminUsersStore.setSurname(v);
          }}
        />
      </div>
      <div className="flex mt-5">
        <div className="">
          <Button onClick={() => {}}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
});
