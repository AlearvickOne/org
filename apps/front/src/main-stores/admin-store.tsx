import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { pagesNames } from '../pages-names';
import { IconClipboard, IconUsers } from '@org/common-next';
import { IAdminPaths } from '@org/types';

@injectable()
export class AdminStore {
  adminPaths: IAdminPaths[] = [
    {
      id: 0,
      name: 'Пользователи',
      pathname: pagesNames.adminUsers,
      icon: <IconUsers />,
    },
    {
      id: 1,
      name: 'Блоги',
      pathname: pagesNames.adminBlogs,
      icon: <IconClipboard />,
    },
  ];

  currentPageId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPageId(v: number) {
    this.currentPageId = v;
  }
}
