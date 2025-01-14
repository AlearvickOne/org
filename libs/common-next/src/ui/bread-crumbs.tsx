import Link from 'next/link';
import { Fragment } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { clsx } from 'clsx';

interface BreadCrumbsProps {
  crumbs: { name: string; link: string }[];
  router: NextRouter;
}

export const BreadCrumbs = ({ crumbs, router }: BreadCrumbsProps) => {
  return (
    <div className="mt-[10px] mb-[10px] flex gap-x-1 items-center bg-white p-2">
      {crumbs?.map((crumb, index) => {
        return (
          <Fragment key={index}>
            <Link
              className={clsx(
                `hover:text-blue-500`,
                router.asPath === crumb.link && 'text-blue-500'
              )}
              href={crumb.link}
            >
              {crumb.name}
            </Link>
            {index !== crumbs.length - 1 ? <div>{'>'}</div> : null}
          </Fragment>
        );
      })}
    </div>
  );
};
