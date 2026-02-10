# Specification

> Created by /plan on 2026-02-10

## High Level Objective

Refine the Hero section animation to replicate the parallax behavior seen on https://www.filippoforner.com, while maintaining the existing "Sonty Bhai" design identity.

## Requirements

### 1. Hero Animation (Parallax)
- **Reference**: https://www.filippoforner.com
- **Behavior**:
    - **Heading**: Translates Y axis on scroll at a **slow** speed (`scrub: 1`).
    - **Navbar**: Translates Y axis on scroll at a **fast** speed (`scrub: 1`).
    - **Background**: Remains pinned/fixed for a longer duration to enhance the parallax depth.
    - **Smoothing**: Increase scrub time (0.5s -> 1s) for smoother interpolation.
    - **Outcome**: The navbar should visibly overtake or separate from the heading as the user scrolls down, creating a depth effect.
    - **Constraint**: Must work with the current fixed/sticky hero layout.

### 2. Design Identity
- **Preserve**:
    - Fonts (Great Vibes, Bricolage Grotesque).
    - Existing text content ("VIVEK Singh", "AFilmCraft", "By Sonty").
    - Video background.
    - Signature SVG animation.
    - Noise texture (recently added).

### 3. Performance
- **Framework**: Next.js 16 (App Router).
- **Optimization**:
    - Use `gsap.context` for proper cleanup.
    - Use `will-change` properties where appropriate.
    - Ensure smooth scrubbing with Lenis (already installed).

## Status

FINALIZED
