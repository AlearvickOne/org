import { observer } from 'mobx-react';
import { BlogStore } from '../store/blog-store';
import { Fragment } from 'react';

interface Props {
  blogStore: BlogStore;
}

export const Blog = observer(({ blogStore }: Props) => {
  return (
    <div>
      <div className="w-full bg-white shadow-xl pb-10 px-3">
        <div className="font-medium text-h4 px-[14px] py-1 border-b-1">
          {blogStore.blog.title}
        </div>
        <div>
          <div
            className="whitespace-pre-wrap ql-editor"
            dangerouslySetInnerHTML={{
              __html: blogStore.blog.content,
            }}
          />
        </div>
      </div>

      <div className="font-medium px-[14px] py-1 border-b-1 bg-white mt-3">
        Автор
      </div>
    </div>
  );
});
