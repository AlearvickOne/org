import { useEffect } from 'react';

export const useScrollDisabled = (valueBoolean: boolean) => {
  useEffect(() => {
    if (valueBoolean) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [valueBoolean]);
};
