import { useEffect, useState } from 'react';

const useDebounced = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [value]);
  return debouncedValue;
};

export default useDebounced;
