import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import {
  AdminTable,
  DateTimeLib,
  IconAddBlog,
  IconDelete,
  IconEditor,
  InputSearch,
  PaginatorBase,
} from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { AdminBlogsStore } from './store/admin-blogs-store';
import { useEffect } from 'react';
import { pagesNames } from '../../../pages-names';
import Image from 'next/image';
import { publicUrl } from '../../../../conf';
import Link from 'next/link';

const adminBlogsStore = ioc.get<AdminBlogsStore>('AdminBlogsStore');

export const AdminBlogsPage = observer(() => {
  useEffect(() => {
    adminBlogsStore.getBlogs().then();
  }, []);

  return (
    <LayoutAdmin>
      <div className="mb-5 flex">
        <Link
          href={pagesNames.adminBlogs + `/blog`}
          className="cursor-pointer p-1 rounded-md bg-violet-100"
        >
          <IconAddBlog />
        </Link>
      </div>

      <div className="mb-5 flex w-full gap-5 justify-center md:flex-row flex-col">
        <div className="md:w-[350px]">
          <InputSearch
            type={'text'}
            value={adminBlogsStore.searchBlogById}
            onChange={(v) => adminBlogsStore.setSearchBlogById(v)}
            onClickSearch={() => adminBlogsStore.getBlogs()}
            maxLength={5}
            placeholder="Поиск по номеру блога"
          />
        </div>
        <div className="md:w-[350px]">
          <InputSearch
            type={'text'}
            value={adminBlogsStore.searchBlogByTitle}
            onChange={(v) => adminBlogsStore.setSearchBlogByTitle(v)}
            onClickSearch={() => adminBlogsStore.getBlogs()}
            maxLength={100}
            placeholder="Поиск по заголовку блога"
          />
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
            photo: blog.photo ? (
              <Image
                className="max-w-[150px]"
                loading="lazy"
                src={publicUrl + blog.photo}
                alt={'фото'}
                width={150}
                height={150}
              />
            ) : null,
            title: <div className="text-left">{blog.title}</div>,
            desc: <div className="text-left">{blog.description}</div>,
            date: DateTimeLib.mySqlDatetimeToString(blog.created_at),
            editBtn: (
              <Link
                className="cursor-pointer"
                href={pagesNames.adminBlogs + `/blog?id=${blog.id}`}
              >
                <IconEditor />
              </Link>
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

      <div className="flex justify-center mt-3 text-[18px]">
        <PaginatorBase
          page={adminBlogsStore.page}
          quantityPages={adminBlogsStore.quantityPages}
          setPage={(v) => adminBlogsStore.setPage(v)}
        />
      </div>
    </LayoutAdmin>
  );
});
