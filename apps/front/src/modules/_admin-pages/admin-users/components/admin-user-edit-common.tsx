import { observer } from 'mobx-react';
import { Button, ComboboxBase, InputBase } from '@org/common-next';
import { AdminUsersStore } from '../store/admin-users-store';

interface Props {
  adminUsersStore: AdminUsersStore;
}

export const AdminUserEditCommon = observer(({ adminUsersStore }: Props) => {
  return (
    <div className="px-3">
      <div className="grid grid-rows-3 grid-cols-2 gap-x-8 gap-y-5">
        <InputBase
          label={'Имя'}
          type={'text'}
          value={adminUsersStore.user.name}
          placeholder={'Введите имя пользователя'}
          onChange={(v) => adminUsersStore.setName(v)}
          error={adminUsersStore.errors['name']}
        />

        <InputBase
          label={'Фамилия'}
          type={'text'}
          value={adminUsersStore.user.surname}
          placeholder={'Введите фамилию пользователя'}
          onChange={(v) => {
            adminUsersStore.setSurname(v);
          }}
          error={adminUsersStore.errors['surname']}
        />

        <InputBase
          label={'Ник'}
          type={'text'}
          value={adminUsersStore.user.nickname}
          placeholder={'Введите ник пользователя'}
          onChange={(v) => adminUsersStore.setNickname(v)}
          error={adminUsersStore.errors['nickname']}
        />
        <InputBase
          label={'Email'}
          type={'text'}
          value={adminUsersStore.user.email}
          placeholder={'Введите email пользователя'}
          onChange={(v) => adminUsersStore.setEmail(v)}
          error={adminUsersStore.errors['email']}
        />

        <ComboboxBase
          label={'Роль'}
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
          ]}
          // value={adminUsersStore.user.email}
          // placeholder={'Введите email пользователя'}
          // onChange={(v) => adminUsersStore.setEmail(v)}
          // error={adminUsersStore.errors['email']}
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
