import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { AdminPaths } from './admin/admin-paths';
import { AdminHeader } from './header/admin-header';
import ioc from '../../ioc/ioc';
import { AdminStore } from '../main-stores/admin-store';

interface LayoutAdminProps {
  children: ReactNode;
  titleHead?: string;
}

const adminStore = ioc.get<AdminStore>('AdminStore');

export const LayoutAdmin = observer(
  ({ children, titleHead }: LayoutAdminProps) => {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="max-w-[1366px] w-full flex flex-col bg-white">
          <AdminHeader />
          <div className="flex px-[20px] gap-x-4 mt-5">
            <AdminPaths adminStore={adminStore} />
            <div className="w-full bg-blue-200 rounded-md">
              <div className="px-[40px] py-[50px]">
                <div className="bg-white rounded-md p-5 border-1 border-blue-500">
                  <div className="text-h5-2 font-medium">
                    {titleHead ??
                      adminStore.adminPaths[adminStore.currentPageId].name}
                  </div>
                  <div className="border-b-1 border-blue-500 w-full mt-3 mb-5" />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
