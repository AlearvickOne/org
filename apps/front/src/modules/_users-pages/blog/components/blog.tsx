import { observer } from 'mobx-react';
import { BlogStore } from '../store/blog-store';
import { Button, TextareaBase } from '@org/common-next';
import { clsx } from 'clsx';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';

interface Props {
  blogStore: BlogStore;
}

export const Blog = observer(({ blogStore }: Props) => {
  const clientId = blogStore.userStore.user.id;

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

        <div className="border-1 p-3 bg-white shadow-inner shadow-stone-300 rounded-[3px] flex flex-col w-full max-h-[800px] overflow-y-auto mb-4">
          {blogStore.comments.map((comment) => (
            <div
              key={Math.random()}
              className={
                comment.userId === clientId ? 'text-right' : 'text-left'
              }
            >
              <div className="mb-4 border-1 border-blue-200 p-2 inline-block shadow-md min-w-[150px] rounded-md bg-white shadow-blue-200">
                <div
                  className={clsx(
                    'border-b-1 text-left font-medium mb-2 border-blue-200',
                    comment.userId === clientId ? 'text-blue-500' : ''
                  )}
                >
                  {comment.nickname}
                </div>
                <div className="text-left max-w-[400px]">{comment.comment}</div>
                {comment.userId !== clientId ? (
                  <div
                    className="text-right text-blue-500 cursor-pointer mt-2"
                    onClick={() =>
                      blogStore.setOtherUserComment({
                        nickname: comment.nickname,
                        comment: comment.comment,
                      })
                    }
                  >
                    Ответить
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <TextareaBase
          label="Новый комментарий:"
          labelFontSize="medium"
          placeholder="Введите ваш комментарий в это поле"
          rows={2}
          value={blogStore.newComment}
          onChange={(v) => blogStore.setNewComment(v)}
        >
          {blogStore.otherUserComment ? (
            <div className="bg-slate-100 h-[50px]overflow-hidden rounded-[5px]">
              <div className="p-1 text-slate-800">
                <div className="border-b-1 border-blue-100 font-medium flex justify-between">
                  {blogStore.otherUserComment.nickname}
                  <div onClick={() => blogStore.setOtherUserComment(null)}>
                    <CloseIcon />
                  </div>
                </div>
                <div className="truncate">
                  {blogStore.otherUserComment.comment}
                </div>
              </div>
            </div>
          ) : null}
        </TextareaBase>
        <div className="flex justify-end mt-3">
          <div>
            <Button onClick={() => blogStore.pushComment()}>Отправить</Button>
          </div>
        </div>
      </div>
    </div>
  );
});
