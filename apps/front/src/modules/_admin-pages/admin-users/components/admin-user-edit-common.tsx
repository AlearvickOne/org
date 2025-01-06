import { observer } from 'mobx-react';
import { Button, InputBase } from '@org/common-next';
import { AdminUsersStore } from '../store/admin-users-store';

interface Props {
  adminUsersStore: AdminUsersStore;
}

export const AdminUserEditCommon = observer(({ adminUsersStore }: Props) => {
  return (
    <div className="px-3">
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

      <div className="flex mt-5">
        <div className="">
          <Button onClick={() => adminUsersStore.saveEditUser()}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
});
