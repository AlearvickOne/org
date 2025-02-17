import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useRouter } from 'next/router';
import ioc from '../../ioc/ioc';
import { UserStore } from '../main-stores/user-store';
import { useEffect, useState } from 'react';
import { pagesNames } from '../pages-names';
import 'react-quill/dist/quill.snow.css';
import { RolesEnum } from '@org/types';

const userStore = ioc.get<UserStore>('UserStore');

function CustomApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();

  const isLocation = (path: string) => {
    return window.location.pathname === path;
  };

  useEffect(() => {
    (async () => {
      try {
        await userStore.loadUser();

        if (
          isLocation(pagesNames.home) ||
          isLocation(pagesNames.login) ||
          isLocation(pagesNames.register) ||
          isLocation(pagesNames.blog)
        ) {
          return setIsLoading(false);
        }

        if (!userStore.user.id) {
          await router.replace(pagesNames.home);
          return setIsLoading(false);
        }

        if (
          window.location.pathname.startsWith('/admin') &&
          [RolesEnum.user].includes(userStore.user.role as RolesEnum)
        ) {
          await router.replace('/404');
        }

        return setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, []);

  if (isError) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="text-white font-medium text-[26px] p-5 bg-red-500 rounded-[15px]  drop-shadow-xl shadow-color-red">
          Ошибка загрузки!
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Блог</title>
      </Head>
      <main className="bg-stone-200 font-sans">
        {isLoading ? (
          <div className="h-screen flex justify-center items-center text-white text-[26px]">
            Загрузка...
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </>
  );
}

export default CustomApp;
