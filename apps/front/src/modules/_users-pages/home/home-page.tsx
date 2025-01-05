import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';
import { Blog } from './components/blog';

export const HomePage = observer(() => {
  return (
    <LayoutUser>
      <div>Домашняя</div>
      <Blog />
    </LayoutUser>
  );
});
