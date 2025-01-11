import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonTextProps {
  onClick: (e: any) => void;
  children: ReactNode;
  color?: 'red';
}

export const ButtonText = ({
  onClick,
  children,
  color = 'red',
}: ButtonTextProps) => {
  return (
    <div
      className={clsx(
        'text-center p-2 cursor-pointer',
        color === 'red' && 'text-red-500'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
