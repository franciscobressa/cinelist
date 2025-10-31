import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsync } from "@/hooks/useAsync";

describe("useAsync", () => {
  it("should handle async success and update state", async () => {
    let resolveFn: (value: string) => void = () => {};
    const asyncFn = jest.fn(() => {
      return new Promise<string>((resolve) => {
        resolveFn = resolve;
      });
    });

    const { result } = renderHook(() => useAsync(asyncFn));

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(asyncFn).toHaveBeenCalledWith(expect.any(AbortSignal));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      resolveFn("ok");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe("ok");
    expect(result.current.error).toBeNull();
  });

  it("should handle errors and expose them", async () => {
    const error = new Error("failed");
    const asyncFn = jest.fn(() => Promise.reject(error));
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useAsync(asyncFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
    consoleSpy.mockRestore();
  });

  it("should cancel execution when signal is aborted", async () => {
    let resolveFn: (value: string) => void = () => {};
    const asyncFn = jest.fn(() => {
      return new Promise<string>((resolve) => {
        resolveFn = resolve;
      });
    });

    const { result } = renderHook(() =>
      useAsync(asyncFn, [], { immediate: false })
    );

    expect(result.current.loading).toBe(false);

    let controller: AbortController;

    await act(async () => {
      controller = new AbortController();
      const promise = result.current.execute(controller.signal);
      controller.abort();
      resolveFn("ignored");
      await promise.catch(() => {});
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
