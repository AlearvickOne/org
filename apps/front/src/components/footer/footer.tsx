import { LogoImage } from '@org/common-next';
import Link from 'next/link';
import { pagesNames } from '../../pages-names';

export const Footer = () => {
  const dateYearNow = new Date().getFullYear();

  return (
    <div className="flex flex-col w-full bg-white shadow-inner border-t-1">
      <div className="w-full mt-2 h-[100px] flex justify-center items-center">
        <Link href={pagesNames.home}>
          <LogoImage />
        </Link>
      </div>
      <div className="text-center pb-10">
        <em className="block">Читаем. Учимся. Растём.</em>
        <em className="block">©{dateYearNow} Blog-org. Все права защищены!</em>
      </div>
    </div>
  );
};
