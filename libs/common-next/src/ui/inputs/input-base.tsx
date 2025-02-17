import { clsx } from 'clsx';
import { isArray } from 'class-validator';

interface InputBaseProps {
  label?: string;
  type: 'text' | 'password' | 'email' | 'tel';
  labelFontSize?: 'medium' | 'base';
  maxLength?: number;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}

export const InputBase = ({
  label,
  type,
  value,
  placeholder,
  maxLength,
  labelFontSize = 'medium',
  onChange,
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
            className="py-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200 w-full pr-20"
            type={type}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
          />
          {maxLength ? (
            <div
              className={clsx(
                'absolute top-2 right-0 bottom-0',
                value?.length === maxLength ? 'text-red-500' : 'text-slate-500'
              )}
            >
              {value?.length}/{maxLength}
            </div>
          ) : null}
        </div>
      </div>
      <div className="text-red-500 text-[14px] mt-1">
        {error ? (
          <div>
            {isArray(error)
              ? error.map((e) => <span className="mr-2">{e}</span>)
              : error}
          </div>
        ) : null}
      </div>
    </div>
  );
};
