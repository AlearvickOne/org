import { observer } from 'mobx-react';
import { AccountStore } from '../store/account-store';
import { Button, InputBase } from '@org/common-next';

interface Props {
  accountStore: AccountStore;
}

export const PasswordChange = observer(({ accountStore }: Props) => {
  return (
    <div className="flex flex-col gap-y-[15px] w-full">
      <InputBase
        label="Новый пароль"
        type="password"
        value={accountStore.password}
        onChange={(v) => {
          accountStore.setPassword(v);
        }}
        placeholder="Введите новый пароль"
      />

      <InputBase
        label="Повторите пароль"
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
      <div className="w-[150px]">
        <Button
          isDisabled={accountStore.isPasswordCheckError}
          onClick={() => accountStore.saveUser()}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
});
