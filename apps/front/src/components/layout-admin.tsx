import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { AdminPaths } from './admin/admin-paths';
import { Header } from './header/header';

interface LayoutAdminProps {
  children: ReactNode;
}

export const LayoutAdmin = observer(({ children }: LayoutAdminProps) => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-[1366px] w-full flex flex-col bg-white">
        <Header />
        <div className="flex mt-10 px-[20px]">
          <AdminPaths />
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
});
