import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { pagesNames } from '../pages/pages-names';
import { IconClipboard, IconMonitor, IconUsers } from '@org/common-next';

interface IAdminPaths {
  id: number;
  name: string;
  pathname: string;
  icon: JSX.Element;
}

@injectable()
export class AdminStore {
  adminPaths: IAdminPaths[] = [
    {
      id: 0,
      name: 'Dashboard',
      pathname: pagesNames.adminDashboard,
      icon: <IconMonitor />,
    },
    {
      id: 1,
      name: 'Пользователи',
      pathname: pagesNames.adminUsers,
      icon: <IconUsers />,
    },
    {
      id: 2,
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
