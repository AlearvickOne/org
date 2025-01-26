import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { AdminPaths } from './admin/admin-paths';
import { AdminHeader } from './header/admin-header';
import ioc from '../../ioc/ioc';
import { AdminStore } from '../main-stores/admin-store';
import { clsx } from 'clsx';

interface LayoutAdminProps {
  children: ReactNode;
  titleHead?: string;
  tabs?: { title: string }[];
  tabIndex?: number;
  setTabIndex?: (index: number) => void;
}

const adminStore = ioc.get<AdminStore>('AdminStore');

export const LayoutAdmin = observer(
  ({ children, titleHead, tabs, tabIndex, setTabIndex }: LayoutAdminProps) => {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="max-w-[1366px] w-full flex flex-col">
          <AdminHeader />
          <div className="flex px-[20px] gap-x-4 mt-5 bg-white py-10 h-full shadow-xl">
            <AdminPaths adminStore={adminStore} />
            <div className="w-full bg-blue-200 rounded-md">
              <div className="px-[40px] py-[50px]">
                <div className="bg-white rounded-md p-5 border-1 border-blue-500">
                  <div className="text-h5-2 font-medium mb-3">
                    {titleHead ??
                      adminStore.adminPaths[adminStore.currentPageId].name}
                  </div>

                  {tabs ? (
                    <div className="tabs mt-3 mb-1">
                      <div className="flex gap-x-3">
                        {tabs.map((tab, index) => (
                          <div
                            className={clsx(
                              `cursor-pointer`,
                              tabIndex === index ? 'text-blue-500' : ''
                            )}
                            key={index}
                            onClick={() => setTabIndex?.(index) ?? null}
                          >
                            {tab.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="border-b-1 border-blue-500 w-full mb-5" />

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
