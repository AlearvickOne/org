import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';
import ioc from '../../../../ioc/ioc';
import { BlogStore } from './store/blog-store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const blogStore = ioc.get<BlogStore>('BlogStore');

export const BlogPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    blogStore.loadBlog(router.query.id as string).then();
  }, [router.query]);

  return (
    <LayoutUser>
      <div className="">
        <div
          className="whitespace-pre-wrap ql-editor"
          dangerouslySetInnerHTML={{
            __html: blogStore.blog.content,
          }}
        />
      </div>
    </LayoutUser>
  );
});
