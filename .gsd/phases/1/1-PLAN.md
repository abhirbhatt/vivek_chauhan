---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Implement Split-Speed Parallax

## Objective
Configure GSAP ScrollTrigger in `Hero.tsx` to apply distinct parallax speeds to the Heading (slow) and Navbar (fast), creating the requested depth effect.

## Context
- .gsd/SPEC.md
- src/components/ui/Hero.tsx

## Tasks

<task type="auto">
  <name>Configure Parallax ScrollTriggers</name>
  <files>src/components/ui/Hero.tsx</files>
  <action>
    Modify `Hero.tsx` to:
    1.  Separate the `hero-text-group` animation into individual animations for the Heading and Navbar.
    2.  Apply a **slow** `y` translation (e.g., `-30vh` over 100vh scroll) to the Heading (`.hero-title`, `.hero-subtitle`).
    3.  Apply a **fast** `y` translation (e.g., `-120vh` over 100vh scroll) to the Navbar (`navRef.current`).
    4.  Update the scroll trigger to cover an extended distance (e.g., `end: 'bottom top+=100%'`) to keep the background pinned effectively for longer.
    5.  Set `scrub: 1` or higher (up to 1.5) on the ScrollTriggers to make the movement feel weightier and smoother.
    5.  Remove the grouping wrapper animation if it interferes with individual speeds.
  </action>
  <verify>Check `Hero.tsx` for two distinct `gsap.to` calls with different `y` values in the ScrollTrigger configuration.</verify>
  <done>Heading moves slowly, Navbar moves quickly on scroll.</done>
</task>

<task type="auto">
  <name>Optimize Animation Performance</name>
  <files>src/components/ui/Hero.tsx</files>
  <action>
    1.  Add `will-change: transform` to the animated elements via inline styles or Tailwind classes.
    2.  Ensure `gsap.context` wraps the new animations for proper cleanup.
    3.  Verify that `scrub` values are set for smooth interaction (e.g., 0.5 or 1).
  </action>
  <verify>Check `Hero.tsx` for `will-change` properties on animated elements.</verify>
  <done>Animations are optimized and cleaned up correctly.</done>
</task>

## Success Criteria
- [ ] Heading translates Y at a slow speed (background layer feel).
- [ ] Navbar translates Y at a fast speed (foreground layer feel).
- [ ] The visual gap between Heading and Navbar increases as the user scrolls.
