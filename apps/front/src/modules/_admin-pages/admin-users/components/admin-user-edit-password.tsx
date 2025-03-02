import { observer } from 'mobx-react';
import { Button, InputBase } from '@org/common-next';
import { AdminUsersStore } from '../store/admin-users-store';

interface Props {
  adminUsersStore: AdminUsersStore;
}

export const AdminUserEditPassword = observer(({ adminUsersStore }: Props) => {
  return (
    <div className="md:px-3">
      <div className="md:grid md:grid-rows-2 md:grid-cols-2 gap-x-8 gap-y-5 flex flex-col">
        <InputBase
          label={'Пароль:'}
          type={'password'}
          value={adminUsersStore.password}
          placeholder={'Введите пароль'}
          onChange={(v) => adminUsersStore.setPassword(v)}
        />
        <InputBase
          label={'Подтверждение пароля:'}
          type={'password'}
          value={adminUsersStore.passwordCheck}
          placeholder={'Повторите пароль'}
          onChange={(v) => {
            adminUsersStore.setPasswordCheck(v);
          }}
          error={
            adminUsersStore.isButtonSaveDisabled ? 'Пароли не совпадают' : ''
          }
        />
      </div>

      <div className="mt-5">
        <Button
          maxWidth={200}
          isDisabled={
            adminUsersStore.isButtonSaveDisabled || !adminUsersStore.password
          }
          onClick={() => adminUsersStore.saveEditUser()}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
});
