"use client";

import { useSyncExternalStore, useCallback } from "react";

const WATCH_HISTORY_KEY = "watch_history";
type WatchHistoryMap = Record<number, { progress: number }>;

const getSnapshot = () => localStorage.getItem(WATCH_HISTORY_KEY);

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => null;

export const useWatchHistory = () => {
  const rawData = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const history: WatchHistoryMap = (() => {
    if (!rawData) return {};
    try {
      return JSON.parse(rawData);
    } catch (e) {
      console.error("Watch history corruption detected", e);
      return {};
    }
  })();

  const saveProgress = useCallback((movieId: number, progress: number) => {
    if (!movieId) return;

    try {
      const currentHistory: WatchHistoryMap = JSON.parse(
        localStorage.getItem(WATCH_HISTORY_KEY) || "{}",
      );
      const updatedHistory: WatchHistoryMap = {
        ...currentHistory,
        [movieId]: { progress: Math.min(Math.max(progress, 0), 100) },
      };

      localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updatedHistory));
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  }, []);

  return { history, saveProgress };
};
