import { observer } from 'mobx-react';
import { BlogStore } from '../store/blog-store';
import { Button, TextareaBase } from '@org/common-next';

interface Props {
  blogStore: BlogStore;
}

export const Blog = observer(({ blogStore }: Props) => {
  return (
    <div>
      <div className="bg-white shadow-xl pb-10 px-3 w-[927px]">
        <div className="font-medium text-h4 px-[14px] pb-1 pt-5 border-b-1">
          {blogStore.blog.title}
        </div>
        <div>
          <div
            className="whitespace-pre-wrap ql-editor"
            dangerouslySetInnerHTML={{
              __html: blogStore.blog.content,
            }}
          />
        </div>
        <div className="font-medium px-[14px] py-1 bg-white mt-3 text-right">
          Автор:{' '}
          <em className="font-normal">
            {blogStore.blog.user?.nickname ?? 'Аноним'}
          </em>
        </div>
      </div>
      <div className="bg-white shadow-xl w-[927px] mt-5 px-[14px] pb-10">
        <div className="font-medium text-h6 border-b-1 mb-5 pt-5 pb-1">
          Комментарии
        </div>
        <TextareaBase
          label="Новый комментарий:"
          placeholder="Введите ваш комментарий в это поле"
          rows={2}
          value={blogStore.newComment}
          onChange={(v) => blogStore.setNewComment(v)}
        />
        <div className="flex justify-end mt-3 mb-10">
          <div>
            <Button onClick={() => blogStore.pushComment()}>Отправить</Button>
          </div>
        </div>

        <div className="border-1 p-2 shadow-inner">
          {blogStore.comments.map((comment) => (
            <div>{comment}</div>
          ))}
        </div>
      </div>
    </div>
  );
});
