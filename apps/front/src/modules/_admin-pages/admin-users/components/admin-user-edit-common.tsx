import { observer } from 'mobx-react';
import {
  Button,
  ButtonText,
  ComboboxBase,
  IconClose,
  InputBase,
} from '@org/common-next';
import { AdminUsersStore } from '../store/admin-users-store';

interface Props {
  adminUsersStore: AdminUsersStore;
}

export const AdminUserEditCommon = observer(({ adminUsersStore }: Props) => {
  return (
    <div className="md:px-3">
      <div className="md:grid md:grid-rows-3 md:grid-cols-2 gap-x-8 gap-y-5 flex flex-col">
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
          value={adminUsersStore.role}
          options={adminUsersStore.roles}
          placeholder={'Выберите роль из списка'}
          onChange={(v) => adminUsersStore.setRole(v)}
          error={adminUsersStore.errors['role']}
        />
      </div>

      <div className="flex justify-between items-end mt-5">
        <div className="">
          <Button onClick={() => adminUsersStore.saveEditUser()}>
            Сохранить
          </Button>
        </div>

        {adminUsersStore.user.id !== -1 ? (
          <div className="">
            <ButtonText
              onClick={() =>
                adminUsersStore.deleteUser(adminUsersStore.user.id)
              }
            >
              <div className="flex gap-x-2 items-center">
                <IconClose />
                <div>Удалить пользователя</div>
              </div>
            </ButtonText>
          </div>
        ) : null}
      </div>
    </div>
  );
});
