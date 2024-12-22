import Link from 'next/link';
import { Fragment } from 'react';

interface BreadCrumbsProps {
  crumbs: { name: string; link: string }[];
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return (
    <div className="mt-[10px] mb-[30px] flex gap-x-1 items-center">
      {crumbs?.map((crumb, index) => {
        return (
          <Fragment key={index}>
            <Link className="hover:text-blue-500" href={crumb.link}>
              {crumb.name}
            </Link>
            {index !== crumbs.length - 1 ? <div>{'>'}</div> : null}
          </Fragment>
        );
      })}
    </div>
  );
};
