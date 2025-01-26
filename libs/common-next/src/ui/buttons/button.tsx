import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  onClick,
  isDisabled = false,
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
        `text-white py-2 px-8 rounded-[5px] w-full shadow-md `,
        isDisabled
          ? `bg-blue-300 shadow-blue-200`
          : `bg-blue-500 shadow-blue-300`
      )}
    >
      {children}
    </button>
  );
};
