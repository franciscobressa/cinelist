import { renderHook } from "@testing-library/react";
import { act } from "react";

import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 300 },
      }
    );

    expect(result.current).toBe("initial");

    act(() => {
      rerender({ value: "next", delay: 300 });
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("next");
  });

  it("should reflect value immediately when delay is zero", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 200 },
      }
    );

    expect(result.current).toBe("first");

    act(() => {
      rerender({ value: "instant", delay: 0 });
    });

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe("instant");
  });
});
