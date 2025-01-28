import { observer } from 'mobx-react';
import { BlogsModel } from '@org/types';
import { pagesNames } from '../../../../pages-names';
import Link from 'next/link';

interface Props {
  blog: BlogsModel;
}

export const BlogCard = observer(({ blog }: Props) => {
  return (
    <div className="p-5 bg-white shadow-xl">
      <div className="flex md:flex-row flex-col gap-x-10 items-center">
        <div className="">Фотка</div>
        <div>
          <div className="font-medium text-h6">{blog.title}</div>
          <div className="">{blog.description}</div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Link
          className="text-blue-500 cursor-pointer hover:text-blue-400"
          href={pagesNames.blog + `?id=${blog.id}`}
        >
          Читать
        </Link>
      </div>
    </div>
  );
});
