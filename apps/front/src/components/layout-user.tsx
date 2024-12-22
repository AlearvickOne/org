import { Header } from './header/header';
import { Footer } from './footer/footer';

import { observer } from 'mobx-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutUser = observer(({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-[1366px] w-full flex flex-col bg-white">
        <Header />

        <div className="flex-grow mx-[50px]">{children}</div>

        <Footer />
      </div>
    </div>
  );
});
