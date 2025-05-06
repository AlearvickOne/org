import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/styles.css';
import { useRouter } from 'next/router';
import ioc from '../../ioc/ioc';
import { UserStore } from '../main-stores/user-store';
import { useEffect, useRef, useState } from 'react';
import { pagesNames } from '../pages-names';
import 'react-quill/dist/quill.snow.css';

import { RolesEnum } from '@org/types';

import { LogoImageAnim } from '@org/common-next';

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
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </main>
    </>
  );
}

export default CustomApp;

function Loading() {
  const [loadingText, setLoadingText] = useState<string>('');

  const animationRef = useRef<number>();

  useEffect(() => {
    let indexCurrent = 0;
    const fullText = 'Идёт загрузка...';

    const typeWriter = () => {
      if (indexCurrent < fullText.length) {
        setLoadingText(fullText.substring(0, indexCurrent + 1));
        indexCurrent++;
        animationRef.current = window.setTimeout(typeWriter, 43); // Скорость печати
      } else {
        // Пауза 2 секунды с сохранением текста
        animationRef.current = window.setTimeout(() => {
          indexCurrent = 0;
          setLoadingText(''); // Сброс только перед новым циклом
          typeWriter(); // Запускаем заново
        }, 2000);
      }
    };

    typeWriter();

    return () => {
      animationRef.current && window.clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <div className="h-screen flex justify-center flex-col items-center text-loading-gradient md:text-[40px] text-[30px]">
      <div className="w-full md:max-w-[50%] max-w-full">
        <LogoImageAnim />
      </div>
      <div>{loadingText}</div>
    </div>
  );
}
