import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';

export const HomePage = observer(() => {
  return (
    <LayoutUser>
      <div>Домашняя</div>;
    </LayoutUser>
  );
});
