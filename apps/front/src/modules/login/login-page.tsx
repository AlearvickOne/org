import { observer } from 'mobx-react';
import container from '../../../ioc/ioc';
import { LoginStore } from './store/login-store';
import { useEffect } from 'react';
import { Button, InputAuth } from '@org/common-next';

const loginStore = container.get<LoginStore>('LoginStore');

export const LoginPage = observer(() => {
  useEffect(() => {
    loginStore.init().then();
  }, []);

  return (
    <div className="">
      <form className="flex flex-col justify-center items-center h-screen m-0 gap-y-2">
        <InputAuth
          label="Email"
          type="email"
          value={loginStore.email}
          onChange={(v) => loginStore.setEmail(v)}
        />

        <InputAuth
          label="Пароль"
          type="password"
          value={loginStore.password}
          onChange={(v) => loginStore.setPassword(v)}
        />

        <Button onClick={() => null}>Войти</Button>
      </form>
    </div>
  );
});
