import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useRouter } from 'next/router';
import ioc from '../../ioc/ioc';
import { UserStore } from '../main-stores/user-store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const userStore = ioc.get<UserStore>('UserStore');

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await userStore.loadUser();

      try {
        if (!userStore.user.id) {
          await router.replace('/login');
          return;
        }
        return;
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to front!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
