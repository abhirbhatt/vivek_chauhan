# Implementation Plan: Footer Spotlight Effect

This document outlines the steps to integrate the spotlight cursor effect specifically for the footer section.

## 1. Create the Custom Hook
Create `src/hooks/use-spotlight.ts` with the provided logic, but refactored to allow scoping to a specific container (the footer).

### Enhancements:
- Modify `useEffect` to attach `mousemove` and `mouseleave` listeners to a target element instead of the entire `document`.
- Add a visibility state or opacity control to ensure the spotlight is only visible when the mouse enters the footer area.

## 2. Create the Spotlight Component
Create `src/components/ui/SpotlightCursor.tsx` which will render the `<canvas>`.

### Enhancements:
- Update the component to accept a `containerRef` prop.
- Ensure the canvas is positioned correctly (e.g., `absolute` within a `relative` footer or `fixed` with visibility logic).

## 3. Integrate into Footer
Modify `src/components/ui/Footer.tsx`:
- Import the `SpotlightCursor` component.
- Pass the existing `footerRef` to the `SpotlightCursor`.
- Ensure the footer has `relative` positioning and `overflow: hidden` (already present) to contain the effect if using absolute positioning.

## 4. Refinement & Styling
- Adjust `glowColor`, `spotlightSize`, and `spotlightIntensity` to match the footer's dark aesthetic.
- Verify that the spotlight doesn't interfere with the social icons' hover effects or the "hello@afilmcraft.com" link.

---
**Next Steps:**
- Receive approval from the user.
- Implement the hook and component.
- Update the Footer.
