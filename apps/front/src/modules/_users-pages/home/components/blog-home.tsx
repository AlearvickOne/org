import { observer } from 'mobx-react';
import { BlogCard } from './blog-card';
import ioc from '../../../../../ioc/ioc';
import { HomeBlogsStore } from '../stores/home-blogs-store';
import { Fragment, useEffect } from 'react';
import { InputSearch, PaginatorBase } from '@org/common-next';

const homeBlogsStore = ioc.get<HomeBlogsStore>('HomeBlogsStore');

export const BlogHome = observer(() => {
  useEffect(() => {
    homeBlogsStore.loadBlogs().then();
  }, []);

  return (
    <div className="flex flex-col gap-y-[14px]">
      <div className="bg-white w-full p-2 flex flex-col shadow-xl">
        <InputSearch
          value={homeBlogsStore.searchBlogs}
          onChange={(v) => homeBlogsStore.setSearchBlogs(v)}
          type={'text'}
          placeholder="Введите название блога для поиска"
          maxLength={100}
          onClickSearch={(v) => homeBlogsStore.loadBlogs()}
        />

        <div className="bg-white flex justify-end py-2 px-5 text-[18px]">
          <PaginatorBase
            setPage={(page) => homeBlogsStore.setPage(page)}
            page={homeBlogsStore.page}
            quantityPages={homeBlogsStore.quantityPages}
          />
        </div>
      </div>

      {homeBlogsStore.blogs.length > 0 ? (
        <>
          {homeBlogsStore.blogs.map((blog) => (
            <Fragment key={blog.id}>
              <BlogCard blog={blog} />
            </Fragment>
          ))}
          <div className="bg-white flex justify-end py-2 px-5 text-[18px]">
            <PaginatorBase
              setPage={(page) => homeBlogsStore.setPage(page)}
              page={homeBlogsStore.page}
              quantityPages={homeBlogsStore.quantityPages}
            />
          </div>
        </>
      ) : (
        <div className="bg-white flex justify-center items-center text-h4 font-medium p-2 shadow-xl">
          Блоги не найдены
        </div>
      )}
    </div>
  );
});
