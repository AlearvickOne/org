import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: () => void;
  maxWidth?: 200;
}

export const Button = ({
  children,
  onClick,
  isDisabled = false,
  maxWidth,
}: ButtonProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={clsx(
        `text-white py-2 px-8 rounded-[5px] w-full shadow-md`,
        maxWidth === 200 ? 'md:max-w-[200px]' : '',
        isDisabled
          ? `bg-blue-300 shadow-blue-200`
          : `bg-blue-500 shadow-blue-300`
      )}
    >
      {children}
    </button>
  );
};
