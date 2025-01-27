import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';
import { IconArrowMini } from '../icons';
import { IComboBox } from '@org/types';

interface ComboboxBaseProps {
  label: string;
  options: IComboBox[];
  value: IComboBox;
  onChange: (value: IComboBox) => void;
  placeholder?: string;
  error?: string | undefined;
}

export const ComboboxBase = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
}: ComboboxBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<any>(null);

  useOutsideClick(() => {
    setIsOpen(false);
  }, optionsRef);

  const handleOnChange = (v: IComboBox) => {
    onChange(v);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-1 w-full relative">
      <label>{label}</label>
      <div className="relative w-full" ref={optionsRef}>
        <input
          className="py-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200 w-full"
          type={'text'}
          value={value.label}
          onChange={() => null}
          placeholder={placeholder}
        />

        <div
          className="absolute right-2 bottom-0 duration-100 transition-all"
          style={isOpen ? { transform: 'rotate(180deg)' } : {}}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconArrowMini />
        </div>

        {isOpen ? (
          <div className="absolute w-full flex flex-col bg-white rounded-md p-2 border-1 border-blue-500 mt-2 cursor-pointer">
            {options.map((option, index) => (
              <div
                className="cursor-pointer py-1 border-b-1"
                key={index}
                onClick={() =>
                  handleOnChange({ value: option.value, label: option.label })
                }
              >
                {option.label}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="text-red-500 text-[14px] mt-1">
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};
