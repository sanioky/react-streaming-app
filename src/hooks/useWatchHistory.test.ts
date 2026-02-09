import { renderHook, act } from "@testing-library/react";
import { useWatchHistory, WATCH_HISTORY_KEY } from "./useWatchHistory";

describe("useWatchHistory hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.dispatchEvent(new Event("storage"));
  });

  it("should initialize with empty history", () => {
    const { result } = renderHook(() => useWatchHistory());
    expect(result.current.history).toEqual({});
  });

  it("should save progress to localStorage", () => {
    const { result } = renderHook(() => useWatchHistory());

    act(() => {
      result.current.saveProgress(1, 50);
      window.dispatchEvent(new Event("storage"));
    });

    const storedData = JSON.parse(
      window.localStorage.getItem(WATCH_HISTORY_KEY) || "{}",
    );

    expect(storedData["1"]).toBeDefined();
    expect(storedData["1"].progress).toBe(50);
    expect(result.current.history[1].progress).toBe(50);
  });

  it("should persist multiple movies in history", () => {
    const { result } = renderHook(() => useWatchHistory());

    act(() => {
      result.current.saveProgress(1, 30);
    });

    act(() => {
      result.current.saveProgress(2, 80);
      window.dispatchEvent(new Event("storage"));
    });

    const storedData = JSON.parse(
      window.localStorage.getItem(WATCH_HISTORY_KEY) || "{}",
    );

    expect(storedData["1"].progress).toBe(30);
    expect(storedData["2"].progress).toBe(80);
  });
});
