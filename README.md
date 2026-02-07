# Streaming Platform Concept (Next.js 16)

## Architectural Decisions

### 1. Styling & Class Management (`cn` utility)
* **Pattern:** `tailwind-merge` + `clsx`.
* **Decision:** Implemented a `cn` helper using `export function` to handle conditional Tailwind classes and resolve property conflicts.

### 2. Modern CSS with Tailwind v4
* **Engine:** Adopted the new `@import "tailwindcss"` engine.
* **Refactoring:** Replaced legacy gradient syntax with `bg-linear` and utilized standardized design tokens (e.g., `min-w-60`) instead of arbitrary values.

### 3. Layout & Navigation
* **Zero-Shift Navigation:**  Implemented a fixed-layout navigation strategy. By using constant font sizes and spacing across all breakpoints, we eliminated Layout Shift (CLS) during window resizing, ensuring a robust and predictable header UI.
* **Interactive Cues:** Applied cursor-pointer to all functional elements (buttons, cards, and close icons) to provide standard web affordance and improve discoverability.

### 4. Content Layout Strategy
* **Grid over Carousel:** Opted for a responsive CSS Grid (`grid-cols-1` to `grid-cols-4`) for content sections. 
* **UX Rationale:** This approach provides better accessibility for desktop users (eliminating horizontal scroll friction) and ensures a clean, predictable UI without external JS dependencies.

### 5. Asset Optimization
* **Placeholder System:** Used Tailwind-based color primitives and linear gradients for content cards instead of external images to ensure 100% uptime and zero external dependencies for the technical assessment.
* **Asset Self-Containment**: All visual assets are stored locally to ensure 100% availability and faster LCP (Largest Contentful Paint) without depending on external CDNs.

### 6. Accessibility (ARIA & Keyboard)
* **Accessibility First:** Integrated `@headlessui/react` (Dialog & Transition) to handle focus trapping, ARIA attributes, and scroll locking out of the box.
* **Keyboard Navigation**: 
  - Full support for `Esc` key to dismiss modals.
  - **Focus Trapping**: Focus remains within the modal while active, preventing accidental navigation of background content.
  - **Focus Restoration**: Automatically returns focus to the triggering element upon closing.
* **ARIA Integration**: 
  - Automatic `role="dialog"` and `aria-modal="true"` attributes.
  - Usage of `DialogTitle` to dynamically link the modal's accessible name for screen readers.
* **Semantic HTML**: All interactive icons (Close, Play, Add to List) are equipped with explicit `aria-label` attributes to provide clear context for assistive technologies.
