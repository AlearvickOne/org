import { observer } from 'mobx-react';
import { AccountStore } from '../store/account-store';
import { Button, InputBase } from '@org/common-next';

interface Props {
  accountStore: AccountStore;
}

export const PasswordChange = observer(({ accountStore }: Props) => {
  return (
    <div className="flex flex-col gap-y-[15px] w-full bg-white px-3 md:px-10 py-2 shadow-xl pb-10 md:pb-20 pt-5">
      <div className="text-h5 font-medium border-b-1 text-center md:text-left border-blue-500 mb-5">
        Сменить пароль
      </div>

      <InputBase
        label="Новый пароль:"
        type="password"
        value={accountStore.password}
        onChange={(v) => {
          accountStore.setPassword(v);
        }}
        placeholder="Введите новый пароль"
        error={accountStore.validateErrors['password']}
      />

      <InputBase
        label="Повторите пароль:"
        type="password"
        value={accountStore.passwordCheck}
        onChange={(v) => {
          accountStore.setPasswordCheck(v);
        }}
        placeholder="Повторите новый пароль"
        error={
          accountStore.isPasswordCheckError ? 'Пароли не совпадают' : undefined
        }
      />

      <Button
        maxWidth={200}
        isDisabled={accountStore.isPasswordCheckError}
        onClick={() => accountStore.saveUser()}
      >
        Сохранить
      </Button>
    </div>
  );
});
