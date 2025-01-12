import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import { AdminTable } from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { AdminBlogsStore } from './store/admin-blogs-store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pagesNames } from '../../../pages/pages-names';

const adminBlogsStore = ioc.get<AdminBlogsStore>('AdminBlogsStore');

export const AdminBlogsPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    adminBlogsStore.getBlogs().then();
  }, []);

  return (
    <LayoutAdmin>
      <div className="mb-5 flex">
        <div className="border-1 p-1 rounded-md border-blue-500">Создать</div>
      </div>

      <AdminTable
        heads={[
          'id',
          'id пользователя',
          'Фото',
          'Название',
          'Описание',
          'Дата',
          '',
        ]}
        bodys={adminBlogsStore.blogs.map((blog) => {
          return {
            id: blog.id,
            userId: blog.user_id,
            photo: blog.photo,
            title: blog.title,
            desc: blog.description,
            date: '43343',
            editBtn: (
              <div
                className="cursor-pointer"
                onClick={() =>
                  router.push(`${pagesNames.adminBlogs}/blog?id=${blog.id}`)
                }
              >
                Эдит
              </div>
            ),
          };
        })}
      />
    </LayoutAdmin>
  );
});
