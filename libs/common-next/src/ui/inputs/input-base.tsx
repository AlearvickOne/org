import { clsx } from 'clsx';

interface InputBaseProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'tel';
  labelFontSize?: 'medium' | 'base';
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
  labelFontSize = 'medium',
  onChange,
  error,
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
          type={type}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
        />
      </div>
      <div className="text-red-500 text-[14px] mt-1">
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};
