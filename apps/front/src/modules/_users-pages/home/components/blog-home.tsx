import { observer } from 'mobx-react';
import { BlogCard } from './blog-card';
import ioc from '../../../../../ioc/ioc';
import { HomeBlogsStore } from '../stores/home-blogs-store';
import { Fragment, useEffect, useState } from 'react';
import { InputSearch } from '@org/common-next';

const homeBlogsStore = ioc.get<HomeBlogsStore>('HomeBlogsStore');

export const BlogHome = observer(() => {
  useEffect(() => {
    homeBlogsStore.loadBlogs().then();
  }, []);

  const [s, setS] = useState<string>('');

  return (
    <div className="flex flex-col gap-y-[14px]">
      {homeBlogsStore.blogs.length > 0 ? (
        <div className="bg-white w-full p-2 flex md:flex-row flex-col gap-x-5 items-center">
          <InputSearch
            type={'text'}
            value={s}
            onChange={(v) => setS(v)}
            placeholder="Введите название блога для поиска"
            maxLength={200}
            onClickSearch={() => {}}
          />
        </div>
      ) : null}

      {homeBlogsStore.blogs.map((blog) => (
        <Fragment key={blog.id}>
          <BlogCard blog={blog} />
        </Fragment>
      ))}
    </div>
  );
});
