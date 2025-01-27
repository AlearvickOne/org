import { observer } from 'mobx-react';
import { ReactNode, useState } from 'react';
import { AdminPaths } from './admin/admin-paths';
import { AdminHeader } from './header/admin-header';
import ioc from '../../ioc/ioc';
import { AdminStore } from '../main-stores/admin-store';
import { clsx } from 'clsx';
import { SelectorBase } from '../../../../libs/common-next/src/ui/selectors';

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

          <div className="flex md:flex-row flex-col md:px-[20px] gap-x-4 md:mt-5 md:bg-white md:py-10 py-5 h-full shadow-xl">
            {/* Список путей для мобильной версии */}
            <div className="md:hidden bg-white px-2 py-2 shadow-xl block mb-5">
              <SelectorBase>
                <AdminPaths adminStore={adminStore} />
              </SelectorBase>
            </div>

            {/* Список путей для десктоп версии */}
            <div className="md:block hidden">
              <AdminPaths adminStore={adminStore} />
            </div>

            <div className="w-full md:bg-blue-200 md:rounded-md bg-white">
              <div className="md:px-[40px] md:py-[50px] p-2">
                <div className="bg-white rounded-md p-5 border-1 border-blue-500">
                  <div className="text-h5-2 font-medium mb-3">
                    {titleHead ??
                      adminStore.adminPaths[adminStore.currentPageId].name}
                  </div>

                  {tabs ? (
                    <div className="mt-3 mb-1">
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
