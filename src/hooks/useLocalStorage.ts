import { useEffect, useState } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export default function useLocalStorage<T>(
  key: string,
  initialState: T
): [T, SetState<T>] {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
