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
  const blogId = adminBlogEditStore.blog.id;

  useEffect(() => {
    adminBlogEditStore.getContentBlog(router.query.id as string).then();
  }, [router.query]);

  return (
    <LayoutAdmin
      titleHead={
        blogId !== -1
          ? `Редактирование блога № ${adminBlogEditStore.blog.id}`
          : 'Создание нового блога'
      }
    >
      <div className="mb-4">
        <InputBase
          labelFontSize="medium"
          label="Заголовок:"
          type={'text'}
          value={adminBlogEditStore.blog.title}
          onChange={(v) => adminBlogEditStore.setTitle(v)}
        />
      </div>

      <div className="mb-4">
        <TextareaBase
          labelFontSize="medium"
          label="Описание:"
          value={adminBlogEditStore.blog.description}
          onChange={(v) => adminBlogEditStore.setDescription(v)}
        />
      </div>

      <div className="mb-4">
        <EditorBlogContent
          label="Добавление контента:"
          value={adminBlogEditStore.blog.content}
          setValue={(v) => adminBlogEditStore.setContent(v)}
        />
      </div>

      <div className="flex md:max-w-[200px]">
        <Button onClick={() => adminBlogEditStore.saveContentBlog()}>
          Сохранить
        </Button>
      </div>
    </LayoutAdmin>
  );
});
