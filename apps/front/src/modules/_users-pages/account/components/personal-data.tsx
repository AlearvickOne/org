import { observer } from 'mobx-react';
import { Button, InputBase, InputFile } from '@org/common-next';
import { AccountStore } from '../store/account-store';
import Image from 'next/image';
import { publicUrl } from '../../../../../conf';

interface Props {
  accountStore: AccountStore;
}

export const PersonalData = observer(({ accountStore }: Props) => {
  return (
    <div className="flex flex-col gap-y-[15px] w-full bg-white px-3 md:px-10 py-2 shadow-xl pb-10 md:pb-20 pt-5">
      <div className="text-h5 font-medium border-b-1 text-center md:text-left border-blue-500 mb-5">
        Личные данные
      </div>

      <div className="flex md:flex-row flex-col gap-5 items-center">
        {accountStore.user.avatar ? (
          <Image
            className="rounded-md max-w-[250px] max-h-[250px]"
            src={publicUrl + accountStore.user.avatar}
            alt={''}
            width={250}
            height={250}
          />
        ) : (
          <div className="rounded-md bg-slate-400 py-10 px-12 text-h1 text-white">
            {accountStore.user.name[0]}
          </div>
        )}

        <InputFile
          label="Аватар:"
          value={accountStore.avatar}
          onChange={(v) => accountStore.setAvatar(v)}
          placeholder="Введите ваше имя"
        />
      </div>

      <InputBase
        label="Имя:"
        type="text"
        value={accountStore.user.name}
        onChange={(v) => accountStore.setName(v)}
        placeholder="Введите ваше имя"
      />

      <InputBase
        label="Фамилия:"
        type="text"
        value={accountStore.user.surname}
        onChange={(v) => {
          accountStore.setSurname(v);
        }}
        placeholder="Введите вашу фамилию"
      />

      <InputBase
        label="Ваш ник:"
        type="text"
        value={accountStore.user.nickname}
        onChange={(v) => {
          accountStore.setSurname(v);
        }}
        placeholder="Введите вашу фамилию"
      />

      <InputBase
        label="Email:"
        type="text"
        value={accountStore.user.email}
        onChange={(v) => {
          accountStore.setSurname(v);
        }}
        placeholder="Введите ваш email"
      />

      <Button
        maxWidth={'200px'}
        isDisabled={accountStore.isPasswordCheckError}
        onClick={() => accountStore.saveUser()}
      >
        Сохранить
      </Button>
    </div>
  );
});
