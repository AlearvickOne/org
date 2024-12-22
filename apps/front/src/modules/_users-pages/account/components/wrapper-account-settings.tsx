import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const WrapperAccountSettings = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full  px-10">{children}</div>
  );
};
