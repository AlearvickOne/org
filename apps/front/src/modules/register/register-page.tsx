import { observer } from 'mobx-react';
import container from '../../../ioc/ioc';
import { Button, InputAuth } from '@org/common-next';
import { RegisterStore } from './store/register-store';

const registerStore = container.get<RegisterStore>('RegisterStore');

export const RegisterPage = observer(() => {
  return (
    <div className="">
      <form className="flex flex-col justify-center items-center h-screen m-0 gap-y-2">
        <InputAuth
          label="Email"
          type="email"
          value={registerStore.email}
          onChange={(v) => registerStore.setEmail(v)}
        />

        <InputAuth
          label="Пароль"
          type="password"
          value={registerStore.password}
          onChange={(v) => registerStore.setPassword(v)}
        />

        <Button onClick={() => registerStore.register()}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
});
