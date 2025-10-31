import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: any) => value is T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      const parsedValue = JSON.parse(item);

      // Validate the parsed value if a validator is provided
      if (validate && !validate(parsedValue)) {
        console.warn(
          `Invalid data in localStorage key "${key}", using initial value`
        );
        return initialValue;
      }

      return parsedValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error saving localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Listen to changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsedValue = JSON.parse(e.newValue);

          // Validate the parsed value if a validator is provided
          if (validate && !validate(parsedValue)) {
            console.warn(`Invalid data received for localStorage key "${key}"`);
            return;
          }

          setStoredValue(parsedValue);
        } catch (error) {
          console.error(
            `Error parsing localStorage change for key "${key}":`,
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, validate]);

  return [storedValue, setValue];
}
