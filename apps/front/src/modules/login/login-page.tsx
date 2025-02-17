import { observer } from 'mobx-react';
import container from '../../../ioc/ioc';
import { LoginStore } from './store/login-store';
import { Button, InputBase, LogoImage } from '@org/common-next';
import { pagesNames } from '../../pages-names';
import Link from 'next/link';

const loginStore = container.get<LoginStore>('LoginStore');

export const LoginPage = observer(() => {
  return (
    <div className="flex justify-center items-center h-screen relative z-20">
      <div className="absolute w-screen -z-10 top-0 left-0 h-1/3 right-0">
        <LogoImage />
      </div>

      <div className="flex flex-col justify-center items-center gap-y-2 bg-white px-8 py-5 shadow-xl w-[300px] ">
        <div className="w-full">
          <div className="text-[18px] mb-2 text-center">Авторизация</div>
          <div className="border-b-[1px] border-stone-200" />
        </div>

        <div className="text-red-500 text-[14px]">{loginStore.error}</div>

        <form className="flex flex-col justify-center items-center gap-y-5 w-full">
          <InputBase
            label="Email"
            type="email"
            value={loginStore.email}
            onChange={(v) => loginStore.setEmail(v)}
            error={loginStore.errorsValidate['email']}
            placeholder="Введите Email"
          />

          <InputBase
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
            <Link
              className="text-blue-500 underline cursor-pointer"
              href={pagesNames.register}
            >
              Регистрация!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
});
