import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../components/layout-admin';
import { AdminTable } from '@org/common-next';

export const AdminBlogsPage = observer(() => {
  return (
    <LayoutAdmin>
      <div className="mb-5 flex">
        <div className="border-1 p-1 rounded-md border-blue-500">Создать</div>
      </div>

      <AdminTable
        heads={['id', 'Фото', 'Название', 'Автор', 'Описание', 'Дата']}
        bodys={[
          {
            id: 1,
            photo: 'Фото',
            name: 'name',
            author: 'Автор',
            desc: 'Деск',
            date: '43343',
          },
          {
            id: 2,
            photo: 'Фото',
            name: 'name',
            author: 'Автор',
            desc: 'Деск',
            date: '43343',
          },
          {
            id: 3,
            photo: 'Фото',
            name: 'name',
            author: 'Автор',
            desc: 'Деск',
            date: '43343',
          },
        ]}
      />
    </LayoutAdmin>
  );
});
