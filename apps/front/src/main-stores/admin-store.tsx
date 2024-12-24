import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { pagesNames } from '../pages/pages-names';

interface IAdminPaths {
  id: number;
  name: string;
  pathname: string;
}

@injectable()
export class AdminStore {
  adminPaths: IAdminPaths[] = [
    {
      id: 0,
      name: 'Дашборд',
      pathname: pagesNames.adminDashboard,
    },
    {
      id: 1,
      name: 'Блоги',
      pathname: pagesNames.adminBlogs,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}
