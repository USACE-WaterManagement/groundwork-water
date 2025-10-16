import { useEffect, useState } from "react";

/*
 * Debounce a value
 *
 * This hook will return a debounced version of the input value, which will only update after the specified delay.
 *
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
export { useDebounce };
