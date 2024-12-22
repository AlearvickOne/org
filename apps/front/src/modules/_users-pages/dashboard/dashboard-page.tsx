import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';

export const DashboardPage = observer(() => {
  return (
    <LayoutUser>
      <div>
        Вход успешен
        <div className=""></div>
      </div>
    </LayoutUser>
  );
});
