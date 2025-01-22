import { observer } from 'mobx-react';
import { Button, InputBase } from '@org/common-next';
import { AccountStore } from '../store/account-store';

interface Props {
  accountStore: AccountStore;
}

export const PersonalData = observer(({ accountStore }: Props) => {
  return (
    <div className="flex flex-col gap-y-[15px] w-full bg-white px-10 py-2 shadow-xl pb-20 pt-5">
      <div className="text-h5 font-medium border-b-1 border-blue-500 mb-5">
        Личные данные
      </div>

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
        label="Ваш ник"
        type="text"
        value={accountStore.user.nickname}
        onChange={(v) => {
          accountStore.setSurname(v);
        }}
        placeholder="Введите вашу фамилию"
      />

      <InputBase
        label="Email"
        type="text"
        value={accountStore.user.email}
        onChange={(v) => {
          accountStore.setSurname(v);
        }}
        placeholder="Введите ваш email"
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
