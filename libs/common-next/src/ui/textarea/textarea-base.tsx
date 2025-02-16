import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface TextareaBaseProps {
  label: string;
  labelFontSize?: 'medium' | 'base';
  rows?: number;
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  error?: string | undefined;
  children?: ReactNode;
}

export const TextareaBase = ({
  label,
  value,
  labelFontSize = 'base',
  rows = 5,
  placeholder,
  onChange,
  maxLength,
  error,
  children,
}: TextareaBaseProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-1">
        <div className="flex">
          <label
            className={clsx(labelFontSize === 'medium' ? 'font-medium' : '')}
          >
            {label}
          </label>
        </div>
        {children}
        <div className="relative w-full">
          <textarea
            className="p-2 outline-none border-1 rounded-md border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200 shadow-inner w-full pb-10"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
          />

          {maxLength ? (
            <div
              className={clsx(
                'absolute right-5 bottom-2',
                value.length === maxLength ? 'text-red-500' : 'text-slate-500'
              )}
            >
              {value.length}/{maxLength}
            </div>
          ) : null}
        </div>
      </div>
      <div className="text-red-500 text-[14px] mt-1">
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};
