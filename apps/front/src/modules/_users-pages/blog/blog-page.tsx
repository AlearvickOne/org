import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';
import ioc from '../../../../ioc/ioc';
import { BlogStore } from './store/blog-store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Blog } from './components/blog';
import { BreadCrumbs } from '@org/common-next';
import { pagesNames } from '../../../pages-names';
import { OtherBlogsList } from './components/other-blogs-list';

const blogStore = ioc.get<BlogStore>('BlogStore');

export const BlogPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    blogStore.loadBlog(router.query.id as string).then();
  }, [router.query]);

  useEffect(() => {
    blogStore.loadRandomBlogs().then();
  }, []);

  return (
    <LayoutUser>
      <BreadCrumbs
        router={router}
        crumbs={[
          { name: 'Главная', link: pagesNames.home },
          {
            name: `${blogStore.blog.title}`,
            link: `${pagesNames.blog}?id=${blogStore.blog.id}`,
          },
        ]}
      />

      <div className="flex gap-x-4">
        <Blog blogStore={blogStore} />
        <OtherBlogsList blogStore={blogStore} />
      </div>
    </LayoutUser>
  );
});
