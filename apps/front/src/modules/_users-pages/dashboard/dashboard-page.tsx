import { observer } from 'mobx-react';
import { Button } from '@org/common-next';
import ioc from '../../../../ioc/ioc';
import { LoginStore } from '../../login/store/login-store';

const loginStore = ioc.get<LoginStore>('LoginStore');

export const DashboardPage = observer(() => {
  return (
    <div>
      Вход успешен
      <div className="">
        <Button
          onClick={() =>
            loginStore.logout().then(() => window.location.reload())
          }
        >
          Выход
        </Button>
      </div>
    </div>
  );
});
