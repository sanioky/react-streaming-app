# Streaming Platform (Next.js 19)

## Architectural decisions

### Performance & Core Logic
* **State Persistence (`useSyncExternalStore`):** Custom `useWatchHistory` hook using modern React 19 patterns to sync with `localStorage`. 
  - **Cross-tab sync**: Updates UI instantly across all open tabs via `storage` event.
  - **Hydration Fix**: Prevents SSR mismatches using a "null-snapshot" strategy.
* **Optimization:** High-performance rendering using `React.memo` and `useCallback` to minimize re-renders in movie rows. History lookups via `Record` mapping.
* **Native Scrolling:** Smooth, library-free horizontal scrolling with `snap-alignment` and a custom `wheel-to-scroll` listener for enhanced desktop UX.

### UI & Styling
* **Tailwind v4 & Modern CSS:** Leverages the new `@import` engine, `bg-linear` gradients, and CSS variables for a maintainable design system.
* **Responsive Layout:** Zero-shift navigation and fluid card sizing using `transform-gpu` for hardware-accelerated animations.
* **Asset Strategy:** Optimized local asset handling and `Next/Image` integration for good LCP (Largest Contentful Paint) and stability.

### Reliability & DX
* **Accessibility (A11y):** Full keyboard support (`Esc` key, focus trapping), semantic HTML, and ARIA attributes via `@headlessui`.
* **Strict Typing:** 100% TypeScript coverage with custom types for API responses and persistent state.
* **Error Resilience:** Defensive JSON parsing and data clamping ($0-100\%$) to ensure UI stability even with corrupted local data.