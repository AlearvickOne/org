import { observer } from 'mobx-react';
import { BlogCard } from './blog-card';
import ioc from '../../../../../ioc/ioc';
import { HomeBlogsStore } from '../stores/home-blogs-store';
import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

const homeBlogsStore = ioc.get<HomeBlogsStore>('HomeBlogsStore');

export const BlogHome = observer(() => {
  const router = useRouter();

  useEffect(() => {
    homeBlogsStore.loadBlogs().then();
  }, []);

  return (
    <div className="flex flex-col gap-y-[14px]">
      {homeBlogsStore.blogs.map((blog) => (
        <Fragment key={blog.id}>
          <BlogCard router={router} blog={blog} />
        </Fragment>
      ))}
    </div>
  );
});
