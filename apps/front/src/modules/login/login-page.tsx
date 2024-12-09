import { observer } from 'mobx-react';
import container from '../../../ioc/ioc';
import { LoginStore } from './store/login-store';
import { useEffect } from 'react';
import { Button, InputAuth } from '@org/common-next';
import { useRouter } from 'next/router';

const loginStore = container.get<LoginStore>('LoginStore');

export const LoginPage = observer(() => {
  const router = useRouter();

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

        <Button
          onClick={() =>
            loginStore
              .login()
              .then(() =>
                window.location.replace('http://localhost:4200/dashboard')
              )
          }
        >
          Войти
        </Button>
      </form>
    </div>
  );
});
