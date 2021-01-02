import { useState, useCallback } from "react";

const useStorage = <T>(
  key: string,
  initialData: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(initialData));
    }

    try {
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      return initialData;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
        return value;
      });
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }, []);

  return [storedValue, setValue];
};

export default useStorage;
