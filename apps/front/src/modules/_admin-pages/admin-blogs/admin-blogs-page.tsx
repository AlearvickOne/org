import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import {
  AdminTable,
  DateTimeLib,
  IconAddBlog,
  IconDelete,
  IconEditor,
} from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { AdminBlogsStore } from './store/admin-blogs-store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pagesNames } from '../../../pages-names';

const adminBlogsStore = ioc.get<AdminBlogsStore>('AdminBlogsStore');

export const AdminBlogsPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    adminBlogsStore.getBlogs().then();
  }, []);

  return (
    <LayoutAdmin>
      <div className="mb-5 flex">
        <div
          onClick={() => router.push(`${pagesNames.adminBlogs}/blog`)}
          className="cursor-pointer p-1 rounded-md bg-violet-100"
        >
          <IconAddBlog />
        </div>
      </div>

      <AdminTable
        heads={[
          'Id',
          'Id пользователя',
          'Фото',
          'Название',
          'Описание',
          'Дата создания',
          '',
          '',
        ]}
        bodys={adminBlogsStore.blogs.map((blog) => {
          return {
            id: blog.id,
            userId: blog.user_id,
            photo: blog.photo,
            title: blog.title,
            desc: blog.description,
            date: DateTimeLib.mySqlDatetimeToString(blog.created_at),
            editBtn: (
              <div
                className="cursor-pointer"
                onClick={() =>
                  router.push(`${pagesNames.adminBlogs}/blog?id=${blog.id}`)
                }
              >
                <IconEditor />
              </div>
            ),
            deleteBlog: (
              <div
                className="cursor-pointer"
                onClick={() => adminBlogsStore.deleteBlog(blog.id)}
              >
                <IconDelete />
              </div>
            ),
          };
        })}
      />
    </LayoutAdmin>
  );
});
