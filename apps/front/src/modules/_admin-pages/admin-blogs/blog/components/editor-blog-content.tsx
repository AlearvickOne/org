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
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image', 'video'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
      ],
    };

    return (
      <div className="w-full">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between">
            <label>{label}</label>
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
