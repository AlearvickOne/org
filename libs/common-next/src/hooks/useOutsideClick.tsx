import { MutableRefObject, useEffect } from 'react';

export const useOutsideClick = (onClick: any, ref: MutableRefObject<any>) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick, ref]);
};
