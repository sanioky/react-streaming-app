# Streaming Platform (Next.js 19)

## Overview & Key Behaviors

### 1. Interactive Progress Tracking
* **Behavior:** Click the **"Watch Now"** (or "Continue") button inside any movie modal to simulate watching content. This increments the progress bar.
* **Cross-Tab Sync:** Open the app in **two browser tabs** side-by-side. Update progress in one, and the other will sync instantly via the `storage` event. This is easiest to see when the tabs are open side by side.

### 2. Loading States (Skeleton UI)
* **Simulated Network Delay:** The "Trending Now" row simulates a 2-second network delay using an asynchronous data fetch.
* **Skeleton Screen:** During this delay, you can see the **MovieRowSkeleton** in action, providing a smooth perceived performance before the content hydrates.

## Getting Started

### Installation
1.  Clone the repository:
```bash
git clone <your-repo-url>
```
2.  Install dependencies:
```bash
npm install
```
3.  Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Running Tests
```bash
npm run test
```

## Architectural Decisions

### Performance & Core Logic
* **State Persistence (`useSyncExternalStore`):** Custom `useWatchHistory` hook using the React 19 `useSyncExternalStore` pattern to reliably sync state with `localStorage`. 
* **Cross-tab Synchronization:** Implementation of the `storage` event listener ensures the UI (progress bars, history) updates instantly across all open browser tabs without a page refresh.
* **SSR/Hydration Strategy:** Uses a "null-snapshot" approach to avoid hydration mismatches, ensuring the client-side `localStorage` data is only injected after the initial mount.
* **Horizontal Scrolling:** Clean, library-free implementation of scrollable movie rows using native CSS overflow and scrollbar management.

### UI & Styling
* **Tailwind v4 & Modern CSS:** Leverages the new `@import` engine and CSS variables. Global styles, custom scrollbar behaviors, and design system tokens are encapsulated in `globals.css` using modern CSS layer logic.
* **Component Styling:** Uses utility-first classes for local component styles, keeping spacing consistent without runtime CSS overhead.
* **Asset Strategy:** Integrated `Next/Image` for optimized image delivery, automatic lazy loading, and improved LCP (Largest Contentful Paint).
* **Responsive Design:** Fluid layouts and card sizing implemented through Tailwind's responsive modifiers to support mobile, tablet, and desktop views.

### Reliability & DX
* **Accessibility (A11y):** Full keyboard support (`Esc` key, focus trapping), semantic HTML, and ARIA attributes via `@headlessui`.
* **Strict Typing:** Full TypeScript coverage with custom types for API responses and persistent state.
* **Error Resilience:** Defensive JSON parsing and data clamping (0-100%) to ensure UI stability even with corrupted local data.

## Test Cases
The following scenarios are covered by the automated test suite:

### 1. Watch History Hook (`useWatchHistory`)
* **Initialization:** Verifies the history starts as an empty object.
* **Data Saving:** Confirms that movie progress is correctly persisted to `localStorage`.
* **Cross-Tab Synchronization:** Ensures the hook listens for `storage` events and updates the state when data changes in another browser tab.
* **Multi-item Support:** Verifies that the history can track and persist multiple movies simultaneously.

### 2. UI Components
* **Movie Modal:**
  * Verifies that movie details (title, etc.) render correctly.
  * Confirms the "Continue" button displays the correct progress percentage from history.
* **Progress Bar:**
  * Displays the correct percentage label (e.g., "45%").
  * Sets the correct CSS `width` style based on the progress value.
  * Ensures the component does not render (returns null) if progress is 0.
* **Interactions:**
  * Confirms that clicking the "Continue" button in the modal triggers the `saveProgress` function with the expected incremented value.

