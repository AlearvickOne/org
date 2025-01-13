import { observer } from 'mobx-react';
import { LayoutAdmin } from '../../../../components/layout-admin';
import { EditorBlogContent } from './components/editor-blog-content';
import ioc from '../../../../../ioc/ioc';
import { AdminBlogEditStore } from './store/admin-blog-edit-store';
import { Button, InputBase, TextareaBase } from '@org/common-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const adminBlogEditStore = ioc.get<AdminBlogEditStore>('AdminBlogEditStore');

export const AdminBlogEdit = observer(() => {
  const router = useRouter();

  useEffect(() => {
    adminBlogEditStore.getContentBlog(router.query.id as string).then();
  }, [router.query]);

  return (
    <LayoutAdmin
      titleHead={`Редактирование блога под Id - ${adminBlogEditStore.blog.id}`}
    >
      <div className="mb-4">
        <InputBase
          label="Заголовок"
          type={'text'}
          value={adminBlogEditStore.blog.title}
          onChange={(v) => adminBlogEditStore.setTitle(v)}
        />
      </div>

      <div className="mb-4">
        <TextareaBase
          label="Описание"
          value={adminBlogEditStore.blog.description}
          onChange={(v) => adminBlogEditStore.setDescription(v)}
        />
      </div>

      <div className="mb-4">
        <EditorBlogContent
          label="Контент"
          value={adminBlogEditStore.blog.content}
          setValue={(v) => adminBlogEditStore.setContent(v)}
        />
      </div>

      <div className="flex">
        <div>
          <Button onClick={() => adminBlogEditStore.saveContentBlog()}>
            Сохранить
          </Button>
        </div>
      </div>
    </LayoutAdmin>
  );
});
