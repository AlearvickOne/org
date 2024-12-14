import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useRouter } from 'next/router';
import ioc from '../../ioc/ioc';
import { UserStore } from '../main-stores/user-store';
import { useEffect, useState } from 'react';

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
          isLocation('/') ||
          isLocation('/login') ||
          isLocation('/register')
        ) {
          return setIsLoading(false);
        }

        if (!userStore.user.id) {
          await router.replace('/login');
          return setIsLoading(false);
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
        <div className="text-red-500 font-medium text-[26px] border-2 border-red-500 p-5 rounded-[20px]">
          Ошибка загрузки!
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Welcome to front!</title>
      </Head>
      <main className="app bg-default">
        {isLoading ? (
          <div className="h-screen flex justify-center items-center">
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
