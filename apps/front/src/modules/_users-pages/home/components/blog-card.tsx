import { observer } from 'mobx-react';
import { BlogsModel } from '@org/types';
import { NextRouter } from 'next/router';
import { pagesNames } from '../../../../pages-names';

interface Props {
  blog: BlogsModel;
  router: NextRouter;
}

export const BlogCard = observer(({ blog, router }: Props) => {
  return (
    <div className="border-1 border-blue-500 p-5 rounded-[15px]">
      <div className="flex gap-x-10 items-center">
        <div className="">Фотка</div>
        <div>
          <div className="font-medium text-h6">{blog.title}</div>
          <div className="">{blog.description}</div>
        </div>
      </div>

      <div
        className="text-blue-500 text-right cursor-pointer hover:text-blue-400"
        onClick={() => router.push(`${pagesNames.blog}?id=${blog.id}`)}
      >
        Читать
      </div>
    </div>
  );
});
