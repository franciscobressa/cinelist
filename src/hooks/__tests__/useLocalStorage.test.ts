import { renderHook, act } from "@testing-library/react";

import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const KEY = "test-key";
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    window.localStorage.clear();
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it("should initialize with stored value when available", () => {
    window.localStorage.setItem(KEY, JSON.stringify("stored"));

    const { result } = renderHook(() => useLocalStorage(KEY, "default"));

    expect(result.current[0]).toBe("stored");
  });

  it("should persist updates to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, "default"));
    const [, setValue] = result.current;

    act(() => {
      setValue("updated");
    });

    expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify("updated"));
    expect(result.current[0]).toBe("updated");
  });

  it("should fall back to initial value when validation fails", () => {
    window.localStorage.setItem(KEY, JSON.stringify("invalid"));

    const validatorCalls: unknown[] = [];
    const validator = (value: unknown): value is string => {
      validatorCalls.push(value);
      return false;
    };

    const { result } = renderHook(() =>
      useLocalStorage(KEY, "fallback", validator)
    );

    expect(result.current[0]).toBe("fallback");
    expect(validatorCalls.length).toBeGreaterThan(0);
  });
});
