import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../../components/layout-admin';
import { TitleBig } from './components/title-big';
import ioc from '../../../../../ioc/ioc';
import { AdminBlogEditStore } from './store/admin-blog-edit-store';
import { Button, InputBase } from '@org/common-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const adminBlogEditStore = ioc.get<AdminBlogEditStore>('AdminBlogEditStore');

export const AdminBlogEdit = observer(() => {
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id as string;
    adminBlogEditStore.getContentBlog(id).then();
  }, [router.query]);

  return (
    <LayoutAdmin>
      <InputBase
        label="Заголовок"
        type={'text'}
        value={adminBlogEditStore.title}
        onChange={(v) => adminBlogEditStore.setTitle(v)}
      />

      <InputBase
        label="Описание"
        type={'text'}
        value={adminBlogEditStore.description}
        onChange={(v) => adminBlogEditStore.setDescription(v)}
      />

      <div className="mb-10">
        <TitleBig
          value={adminBlogEditStore.content}
          setValue={(v) => adminBlogEditStore.setContent(v)}
        />
      </div>
      <Button onClick={() => adminBlogEditStore.saveContentBlog()}>
        Сохранить
      </Button>
      <div
        dangerouslySetInnerHTML={{ __html: adminBlogEditStore.content }}
      ></div>
    </LayoutAdmin>
  );
});
