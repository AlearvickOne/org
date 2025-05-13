import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { CheckboxBase } from '@org/common-next';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  label: string;
  value: string;
  setValue: (v: string) => void;
}

export const EditorBlogContent = observer(
  ({ label, value, setValue }: Props) => {
    const [isReadonly, setIsReadonly] = useState<boolean>(false);

    const modules = {
      toolbar: [
        // Шрифты и заголовки
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        // Стили текста
        ['bold', 'italic', 'underline', 'strike'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ color: [] }, { background: [] }],

        // Выравнивание и отступы
        [{ align: [] }],
        [{ indent: '-1' }, { indent: '+1' }],

        // Списки
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

        // Разное
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],

        // Размеры
        [{ size: ['small', false, 'large', 'huge'] }],

        // Очистка
        ['clean']
      ],

      // Дополнительные модули
      clipboard: {
        matchVisual: false, // Более точное копирование форматирования
      },
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
      }
    };

    return (
      <div className="w-full">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between md:flex-row flex-col gap-y-2">
            <label className="font-medium">{label}</label>
            <CheckboxBase
              label="Предварительный просмотр"
              value={isReadonly}
              onChange={(v) => setIsReadonly(v)}
            />
          </div>

          {isReadonly ? (
            <div
              className="whitespace-pre-wrap ql-editor"
              dangerouslySetInnerHTML={{
                __html: value,
              }}
            />
          ) : (
            <ReactQuill
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          )}
        </div>
      </div>
    );
  }
);
