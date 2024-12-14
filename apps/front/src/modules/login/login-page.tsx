import { observer } from 'mobx-react';
import container from '../../../ioc/ioc';
import { LoginStore } from './store/login-store';
import { useEffect } from 'react';
import { Button, InputAuth } from '@org/common-next';
import { useRouter } from 'next/router';
import { pagesNames } from '../../pages/pages-names';

const loginStore = container.get<LoginStore>('LoginStore');

export const LoginPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    loginStore.init().then();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-y-2 bg-white px-8 py-5 rounded-[20px]  w-[300px]">
        <div className="w-full">
          <div className="text-[18px] mb-2 text-center">Авторизация</div>
          <div className="border-b-[1px] border-stone-200" />
        </div>

        <div className="text-red-500 text-[14px]">{loginStore.error}</div>

        <form className="flex flex-col justify-center items-center gap-y-5 w-full">
          <InputAuth
            label="Email"
            type="email"
            value={loginStore.email}
            onChange={(v) => loginStore.setEmail(v)}
            error={loginStore.errorsValidate['email']}
            placeholder="Введите Email"
          />

          <InputAuth
            label="Пароль"
            type="password"
            value={loginStore.password}
            onChange={(v) => loginStore.setPassword(v)}
            error={loginStore.errorsValidate['password']}
            placeholder="Введите Пароль"
          />

          <Button onClick={() => loginStore.login()}>Войти</Button>

          <div className="text-[14px] text-center">
            Нет аккаунта?{' '}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => router.push(pagesNames.register)}
            >
              Регистрация!
            </span>
          </div>
        </form>
      </div>
    </div>
  );
});
