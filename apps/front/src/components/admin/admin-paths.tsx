import { observer } from 'mobx-react';
import { AdminStore } from '../../main-stores/admin-store';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import { UserStore } from '../../main-stores/user-store';
import { IAdminPaths, RolesEnum } from '@org/types';
import { pagesNames } from '../../pages-names';

interface AdminPathsProps {
  adminStore: AdminStore;
  userStore: UserStore;
}

export const AdminPaths = observer(
  ({ adminStore, userStore }: AdminPathsProps) => {
    const router = useRouter();

    const allowedRolesToPath = (
      path: IAdminPaths,
      pageName: string[],
      roles: string[]
    ) => {
      return (
        pageName.includes(path.pathname) && !roles.includes(userStore.user.role)
      );
    };

    return (
      <div className="px-2 py-5 rounded-[15px] w-full md:min-w-[200px] md:max-w-[200px] flex flex-col gap-y-[10px]">
        {adminStore.adminPaths.map((path) => {
          const isCurrentPath = router.pathname.includes(path.pathname);

          if (
            allowedRolesToPath(path, [pagesNames.adminUsers], [RolesEnum.admin])
          ) {
            return null;
          }

          if (isCurrentPath) {
            adminStore.setCurrentPageId(path.id);
          }

          return (
            <div
              key={path.id}
              onClick={() => {
                adminStore.setCurrentPageId(path.id);
                return router.push(path.pathname);
              }}
              className={clsx(
                'flex gap-x-2 pb-3 items-center border-b-1 cursor-pointer',
                isCurrentPath ? 'text-blue-500 border-blue-500' : 'text-black'
              )}
            >
              {path.icon}
              {path.name}
            </div>
          );
        })}
      </div>
    );
  }
);
