import { observer } from 'mobx-react';
import { LayoutUser } from '../../../components/layout-user';
import { BlogHome } from './components/blog-home';

export const HomePage = observer(() => {
  return (
    <LayoutUser>
      <div className="w-full mt-5 flex flex-col gap-y-5">
        <BlogHome />
      </div>
    </LayoutUser>
  );
});
