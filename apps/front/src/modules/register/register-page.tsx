import { observer } from 'mobx-react';
import container from '../../../ioc/ioc';
import { Button, InputBase, LogoImage } from '@org/common-next';
import { RegisterStore } from './store/register-store';
import { useRouter } from 'next/router';
import { pagesNames } from '../../pages-names';

const registerStore = container.get<RegisterStore>('RegisterStore');

export const RegisterPage = observer(() => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen z-20 relative">
      <div className="absolute w-screen -z-10 top-0 left-0 h-1/3 right-0">
        <LogoImage />
      </div>

      <div className="flex flex-col justify-center items-center gap-y-2 bg-white md:px-8 px-5 py-5 shadow-xl md:w-[450px] w-[90%]">
        <div className="w-full">
          <div className="text-[18px] mb-2 text-center">Регистрация</div>
          <div className="border-b-[1px] border-stone-200" />
        </div>
        {/* Тестовая */}
        <div>
          {registerStore.isSuccessRegister ? 'Регистрация успешна' : null}
        </div>
        <div className="overflow-y-auto h-[500px] md:h-auto w-full">
          <form className="flex flex-col justify-center items-center gap-y-5 w-full md:overflow-hidden">
            <InputBase
              label="Email"
              type="email"
              value={registerStore.email}
              onChange={(v) => registerStore.setEmail(v)}
              error={registerStore.errorsValidate['email']}
              placeholder={'Введите Email'}
            />

            <div className="flex flex-col w-full md:grid md:grid-cols-2 gap-x-5">
              <InputBase
                label="Пароль"
                type="password"
                value={registerStore.password}
                onChange={(v) => registerStore.setPassword(v)}
                error={registerStore.errorsValidate['password']}
                placeholder={'Введите пароль'}
              />

              <InputBase
                label="Повторите пароль"
                type="password"
                value={registerStore.passwordCheck}
                onChange={(v) => registerStore.setPasswordCheck(v)}
                error={
                  registerStore.isPasswordCheckError
                    ? 'Пароли не совпадают'
                    : undefined
                }
                placeholder={'Повторите пароль'}
              />
            </div>

            <div className="flex flex-col w-full md:grid md:grid-cols-2 gap-x-5">
              <InputBase
                label="Имя"
                type="text"
                value={registerStore.name}
                onChange={(v) => registerStore.setName(v)}
                error={registerStore.errorsValidate['name']}
                placeholder={'Введите имя'}
              />

              <InputBase
                label="Фамилия"
                type="text"
                value={registerStore.surname}
                onChange={(v) => registerStore.setSurname(v)}
                error={registerStore.errorsValidate['surname']}
                placeholder={'Введите фамилию'}
              />
            </div>

            <InputBase
              label="Ваш ник"
              type="text"
              value={registerStore.nickname}
              onChange={(v) => registerStore.setNickname(v)}
              error={registerStore.errorsValidate['nickname']}
              placeholder={'Введите ваш ник'}
            />

            <Button
              isDisabled={registerStore.isPasswordCheckError}
              onClick={() => registerStore.register()}
            >
              Зарегистрироваться
            </Button>

            <div className="text-[14px] text-center">
              Уже есть аккаунт?{' '}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => router.push(pagesNames.login)}
              >
                Войти!
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
