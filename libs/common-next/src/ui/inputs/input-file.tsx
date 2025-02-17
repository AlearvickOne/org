import { clsx } from 'clsx';
import placeholder from 'cypress/types/lodash/fp/placeholder';

interface InputBaseProps {
  label: string;
  labelFontSize?: 'medium' | 'base';
  placeholder?: string;
  onChange: (value: FileList | null) => void;
  error?: string | undefined;
  accept?: string[];
}

export const InputFile = ({
  label,
  labelFontSize = 'medium',
  onChange,
  placeholder,
  error,
  accept,
}: InputBaseProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-1">
        <label
          className={clsx(labelFontSize === 'medium' ? 'font-medium' : '')}
        >
          {label}
        </label>
        <input
          className="py-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200"
          type={'file'}
          onChange={(e) => onChange(e.target.files)}
          accept={accept?.toString()}
        />
      </div>
      <div className="text-slate-500 text-[14px] mt-1">
        {placeholder ? <div>{placeholder}</div> : null}
      </div>
      <div className="text-red-500 text-[14px] mt-1">
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};
