import { observer } from 'mobx-react';
import ioc from '../../../ioc/ioc';
import { AdminStore } from '../../main-stores/admin-store';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';

const adminStore = ioc.get<AdminStore>('AdminStore');

export const AdminPaths = observer(() => {
  const router = useRouter();

  return (
    <div className="border-1 px-2 py-5 rounded-[15px] min-w-[120px] flex flex-col items-center gap-y-[10px] border-blue-500">
      {adminStore.adminPaths.map((path) => (
        <div
          key={path.id}
          onClick={() => router.push(path.pathname.split('/')[1])}
          className={clsx(
            window.location.pathname === `/${path.pathname}`
              ? 'text-blue-500'
              : 'text-black'
          )}
        >
          {path.name}
        </div>
      ))}
    </div>
  );
});
