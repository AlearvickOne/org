import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
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
        `text-white py-2 px-8 rounded-[10px] w-full`,
        isDisabled ? `bg-blue-300` : `bg-blue-500`
      )}
    >
      {children}
    </button>
  );
};
