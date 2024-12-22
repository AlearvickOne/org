import { observer } from 'mobx-react';
import { Button, InputBase } from '@org/common-next';
import { AccountStore } from '../store/account-store';

interface Props {
  accountStore: AccountStore;
}

export const PersonalData = observer(({ accountStore }: Props) => {
  return (
    <div className="w-full">
      <InputBase
        label="Имя"
        type="text"
        value={accountStore.user.name}
        onChange={(v) => accountStore.setName(v)}
        placeholder="Введите ваше имя"
      />
      <InputBase
        label="Фамилия"
        type="text"
        value={accountStore.user.surname}
        onChange={(v) => {
          accountStore.setSurname(v);
        }}
        placeholder="Введите вашу фамилию"
      />
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
        value={accountStore.checkedPassword}
        onChange={(v) => {
          accountStore.setCheckedPassword(v);
        }}
        placeholder="Повторите новый пароль"
      />

      <Button onClick={() => accountStore.saveUser()}>Сохранить</Button>
    </div>
  );
});
