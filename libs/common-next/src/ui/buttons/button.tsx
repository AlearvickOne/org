interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white py-2 px-8 rounded-[10px]"
    >
      {children}
    </button>
  );
};
