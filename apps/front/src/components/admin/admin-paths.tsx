import { observer } from 'mobx-react';
import { AdminStore } from '../../main-stores/admin-store';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';

interface AdminPathsProps {
  adminStore: AdminStore;
}

export const AdminPaths = observer(({ adminStore }: AdminPathsProps) => {
  const router = useRouter();

  return (
    <div className="px-2 py-5 rounded-[15px] w-full max-w-[200px] flex flex-col gap-y-[10px]">
      {adminStore.adminPaths.map((path) => {
        const isCurrentPath = router.pathname.includes(path.pathname);

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
});
