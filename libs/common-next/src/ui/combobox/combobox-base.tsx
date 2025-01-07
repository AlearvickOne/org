import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';

interface ComboboxBaseProps {
  label: string;
  options: { value: string; label: string }[];
}

export const ComboboxBase = ({ label, options }: ComboboxBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>();
  const optionsRef = useRef<any>(null);

  useOutsideClick(() => {
    setIsOpen(false);
  }, optionsRef);

  const handleOnChange = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-1 w-full relative">
      <label>{label}</label>
      <div className="relative w-full">
        <input
          className="py-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200 w-full"
          type={'text'}
          onChange={(e) => {}}
          value={selected}
          placeholder={''}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen ? (
          <div
            className="absolute w-full flex flex-col bg-white rounded-md p-2 border-1 border-blue-500 mt-2 cursor-pointer"
            ref={optionsRef}
          >
            {options.map((option) => (
              <div
                className="cursor-pointer py-1 border-b-1"
                onClick={() => handleOnChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
