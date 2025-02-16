import { observer } from 'mobx-react';
import { BlogsModel } from '@org/types';
import { pagesNames } from '../../../../pages-names';
import Link from 'next/link';
import Image from 'next/image';
import { publicUrl } from '../../../../../conf';

interface Props {
  blog: BlogsModel;
}

export const BlogCard = observer(({ blog }: Props) => {
  return (
    <div className="p-5 bg-white shadow-xl">
      <div className="flex md:flex-row flex-col gap-y-5 gap-x-10 items-center">
        {blog.photo ? (
          <div>
            <Image
              loading="lazy"
              className="md:w-auto w-full max-w-[400px] max-h-[400px]"
              width={400}
              height={400}
              src={publicUrl + blog.photo}
              alt={`Фото блога ${blog.id}`}
            />
          </div>
        ) : null}
        <div>
          <div className="font-medium text-h6">{blog.title}</div>
          <div>{blog.description}</div>
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
