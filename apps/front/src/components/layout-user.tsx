import { Header } from './header/header';
import { Footer } from './footer/footer';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const LayoutUser = observer(({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full">
        <Header />
      </div>

      <div className="flex-grow max-w-[1366px] w-full mx-auto flex flex-col px-[50px]">
        <div className="w-full">{children}</div>
      </div>

      <div className="w-full mt-40">
        <Footer />
      </div>
    </div>
  );
});
