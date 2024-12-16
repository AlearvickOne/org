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

      <Button onClick={() => accountStore.saveUser()}>Сохранить</Button>
    </div>
  );
});
