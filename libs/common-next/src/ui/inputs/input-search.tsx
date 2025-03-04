import { clsx } from 'clsx';
import { isArray } from 'class-validator';
import { IconSearch } from '../icons';

interface InputBaseProps {
  label?: string;
  type: 'text' | 'password' | 'email' | 'tel';
  labelFontSize?: 'medium' | 'base';
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClickSearch: (value: string) => void;
  error?: string | undefined;
}

export const InputSearch = ({
  label,
  type,
  placeholder,
  maxLength,
  value,
  onChange,
  labelFontSize = 'medium',
  onClickSearch,
  error,
}: InputBaseProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-1">
        {label ? (
          <label
            className={clsx(labelFontSize === 'medium' ? 'font-medium' : '')}
          >
            {label}
          </label>
        ) : null}
        <div className="relative w-full">
          <input
            className="py-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200 w-full pr-[120px]"
            type={type}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            onKeyDown={(e) => {
              e.key === 'Enter' && onClickSearch(value);
            }}
          />
          {maxLength ? (
            <div
              className={clsx(
                'absolute top-2 right-14',
                value?.length === maxLength ? 'text-red-500' : 'text-slate-500'
              )}
            >
              {value?.length}/{maxLength}
            </div>
          ) : null}
          <div
            className="absolute top-2 right-3 bottom-2 cursor-pointer"
            onClick={() => onClickSearch(value)}
          >
            <IconSearch />
          </div>
        </div>
      </div>
      <div className="text-red-500 text-[14px] mt-1">
        {error ? (
          <div>
            {isArray(error)
              ? error.map((e, index) => (
                  <span key={index} className="mr-2">
                    {e}
                  </span>
                ))
              : error}
          </div>
        ) : null}
      </div>
    </div>
  );
};
