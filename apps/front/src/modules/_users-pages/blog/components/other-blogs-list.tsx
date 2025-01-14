import { observer } from 'mobx-react';
import { BlogStore } from '../store/blog-store';
import { clsx } from 'clsx';
import Link from 'next/link';
import { pagesNames } from '../../../../pages-names';

interface Props {
  blogStore: BlogStore;
}

export const OtherBlogsList = observer(({ blogStore }: Props) => {
  return (
    <div className="bg-white px-5 py-4 flex flex-col gap-y-3 h-full max-w-[350px]">
      {blogStore.randomBlogs.map((randBlog, index) => (
        <div
          key={randBlog.id}
          className={clsx(
            index !== blogStore.randomBlogs.length - 1 && 'border-b-1 pb-1'
          )}
        >
          <Link
            href={pagesNames.blog + `?id=${randBlog.id}`}
            className="font-medium cursor-pointer  hover:text-blue-500"
          >
            {randBlog.title}
          </Link>
        </div>
      ))}
    </div>
  );
});
