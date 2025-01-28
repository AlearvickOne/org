import { IconArrowMini } from '@org/common-next';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const SelectorBase = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex w-full justify-center bg-blue-100 font-medium rounded-[5px] py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>Навигация</div>
        <div
          className="ml-3 duration-100 transition-all"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <IconArrowMini />
        </div>
      </div>

      <div
        className="flex transition-all overflow-hidden duration-75"
        style={{
          maxHeight: isOpen ? '5000px' : '0px',
          marginTop: isOpen ? '16px' : '0px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
