# Implementation Plan: Filippo Forner Portfolio Replica

This plan outlines the step-by-step process to replicate the cinematic portfolio website of Filippo Forner, based on the provided PRD, Design, and Tech Stack documents.

## Phase 1: Project Setup & Configuration
- [ ] **Initialize Next.js Project**
    - Create a new Next.js 14 app with TypeScript, Tailwind CSS, and ESLint.
    - Command: `npx create-next-app@latest ./ --typescript --tailwind --eslint`
- [ ] **Install Dependencies**
    - Animation: `npm install gsap @gsap/react`
    - Smooth Scroll: `npm install lenis`
    - UI Components: `npx shadcn-ui@latest init` (and install needed components like button, input, etc.)
    - Icons: `npm install lucide-react`
    - Utilities: `npm install clsx tailwind-merge`
- [ ] **Configure Project Structure**
    - Create directories: `components`, `styles`, `lib`, `hooks`, `public/videos`, `public/images`.
- [ ] **Setup Fonts**
    - Configure `next/font` for **Inter** or **Helvetica Neue** (Inter is built-in).
    - Add font variables to `tailwind.config.ts`.

## Phase 2: Design System & Styling
- [ ] **Tailwind Configuration**
    - Update `tailwind.config.ts` with the color palette:
        - `background-primary`: `#000000`
        - `background-secondary`: `#0A0A0A`
        - `text-primary`: `#FFFFFF`
        - `text-secondary`: `#CFCFCF`
        - `text-muted`: `#7A7A7A`
    - Define spacing and typography scales as per `design.md.txt`.
- [ ] **Global CSS (`globals.css`)**
    - Set body background to black and text to white.
    - Reset margins/paddings.
    - Add utility classes for glassmorphism (`backdrop-blur`).
    - Define global transition styles (`0.4s cubic-bezier(0.25,0.1,0.25,1)`).

## Phase 3: Core Infrastructure
- [ ] **Smooth Scrolling (Lenis)**
    - Create a wrapper component `SmoothScroll.tsx` to initialize Lenis.
    - Wrap the application in `layout.tsx`.
- [ ] **Navigation Bar**
    - Create `Navbar.tsx`.
    - Implement fixed position, transparent-to-black on scroll.
    - Add Logo (left) and Links (right).
    - Mobile: Implement hamburger menu with full-screen overlay.
- [ ] **Footer**
    - Create `Footer.tsx`.
    - 3-column layout on desktop, stacked on mobile.
    - Links: Legal, Contact info, Socials.

## Phase 4: Homepage Sections (The "Meat")
- [ ] **Hero Section**
    - Component: `Hero.tsx`.
    - Full-screen (100vh).
    - Background video (muted, loop, autoplay) with dark overlay.
    - Center text: H1 (Name) + H2 (Subheading).
    - Animations: Text fade-in + slide-up on load.
- [ ] **Mission Statement**
    - Component: `Mission.tsx`.
    - Centered large text.
    - Scroll-triggered fade-up animation.
- [ ] **Trusted By (Marquee)**
    - Component: `TrustedBy.tsx`.
    - Infinite horizontal scroll of grayscale logos.
    - Hover effect: Grayscale to color.
- [ ] **Works / Projects Grid**
    - Component: `Works.tsx` and `ProjectCard.tsx`.
    - Grid layout (2 cols desktop, 1 col mobile).
    - **Project Card**:
        - Video thumbnail (plays on hover).
        - Title and "View Project" CTA.
        - Hover: Scale up, overlay darken.
- [ ] **Showreel / Services / About**
    - Component: `Showreel.tsx`: Large video preview with play button.
    - Component: `Services.tsx`: List of services with hover reveal effects.
    - Component: `About.tsx`: Split layout (Image + Text).
- [ ] **Contact / CTA Section**
    - Component: `Contact.tsx`.
    - Large heading "Let's create...".
    - Big CTA button "Book an appointment".

## Phase 5: Animations & Polish
- [ ] **Page Transition / Loader**
    - Create a preloader component that fades out after assets load.
- [ ] **GSAP Integration**
    - Implement scroll-triggered animations for all sections (fade-in, slide-up).
    - Ensure smooth stagger effects for lists and grids.
- [ ] **Custom Cursor (Optional but recommended)**
    - Create `CustomCursor.tsx` (small dot, circle outline).
- [ ] **Video Optimization**
    - Ensure all videos are muted, playsinline, and loop.
    - Add poster images for loading states.

## Phase 6: Final Review
- [ ] **Responsive Check**: Test on Mobile (375px), Tablet (768px), and Desktop (1440px+).
- [ ] **Performance Check**: Verify Lighthouse score (Target 95+).
- [ ] **SEO**: Add metadata (Title, Description, OpenGraph).
