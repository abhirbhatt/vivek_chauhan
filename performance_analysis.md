# Website Performance & Load Analysis Report

This document analyzes the factors contributing to loading lag and weight on the portfolio website and provides actionable solutions to optimize for a "butter smooth" experience.

---

## 1. High-Impact Lag Factors ⚠️

### A. Heavy Video Assets (Primary Cause)
The website relies heavily on full-screen auto-playing videos.
- **Problem**: Files like `/media/Web2.mp4` and `/assets/DRAMATIC(1)high.mp4` are likely several megabytes. Multiple high-resolution videos loading simultaneously saturate the user's bandwidth.
- **Current State**: `preload="auto"` or `preload="metadata"` is used in most places, but even metadata for 10+ videos adds up.
- **Lag Effect**: The browser spends all resources downloading video chunks, delaying the execution of animations and script mounting.

### B. GSAP "Layout Thrashing"
- **Problem**: Many components use `gsap.set` and `tl.from` with `filter: 'blur(20px)'`. Blurs are computationally expensive for the GPU to render during initial layout.
- **Current State**: The Hero component and various reveal animations use heavy filters.
- **Lag Effect**: Frame drops (stuttering) during the initial entrance animation.

### C. Intersection Observer Overhead
- **Problem**: Every `VideoRow` in the `VideoGallery` and every `ProjectCard` in `Works` has its own observer or GSAP `ScrollTrigger` batch.
- **Lag Effect**: On pages with many items, having 10-15 active observers can cause "jank" during rapid scrolling.

### D. Unoptimized Image Sources
- **Problem**: Many images are being pulled from external URLs (`unsplash`, `pexels`, `wikimedia`) without local optimization or modern formats like WebP/AVIF.
- **Current State**: `next/image` is used, but relying on remote Unsplash URLs means the Next.js image optimizer has to "fetch-and-process" on the fly for the first user.

---

## 2. Resource Weight Breakdown 📦

| Component | Asset Type | Weight (Est.) | Performance Risk |
| :--- | :--- | :--- | :--- |
| **Hero** | 1 Full HD Video | 5MB - 12MB | **Critical** (Blocks initial view) |
| **Mission** | 5 Mini Videos + Noise | 2MB - 5MB | High (GPU intensive noise texture) |
| **VideoGallery** | 4 Wide Videos | 10MB - 20MB | **Very High** (Bandwidth killer) |
| **Works** | 7 Video Previews | 8MB - 15MB | High (Sequential loading) |
| **Footer** | Spotlight Canvas | Low | Moderate (CPU intensive if resized) |

---

## 3. Recommended Optimization Plan 🚀

### Level 1: Quick Wins (Low Effort)
1. **Video Preloading**: Change all `preload="auto"` to `preload="none"`. Only start loading the video when the component is about to enter the viewport.
2. **WebP/AVIF Conversion**: Convert all `.png` and `.jpg` (like the noise textures) to `.webp` to reduce size by up to 70%.
3. **Mute/PlaysInline**: Ensure all videos have `muted playsInline` (already mostly done) to prevent browser-level blocking.

### Level 2: Engineering Fixes (Moderate Effort)
1. **Video Compression**: Use a tool like Handbrake (H.264/H.265) to compress your `/media` videos. Aim for < 2MB for the Hero and < 500KB for mini-previews.
2. **Debounce Resize**: In the `Footer` and `SpotlightCursor`, the `resize` listener is currently unthrottled. Wrapping it in a `debounce` function will stop lag during window resizing.
3. **Lazy Load Off-Screen Components**: Use `React.lazy` for everything below the fold (Mission, Works, VideoGallery) so the Hero can mount instantly.

### Level 3: Advanced Optimization (High Effort)
1. **Low-Quality Image Placeholders (LQIP)**: Use blurred placeholder images while the heavy video/image is loading.
2. **Video Streaming**: Instead of raw `.mp4`, use HLS or DASH streaming which allows the browser to download only the low-quality version first and scale up.
3. **Replace Canvas Blurs**: The `SpotlightCursor` uses radial gradients. Ensure the `globalCompositeOperation` is used efficiently so the CPU isn't recalculating 60 times per second.

---

## Summary of Initial Lag
The "lag" you feel isn't because the code is bad—it's because **Next.js and GSAP are trying to animate elements while the browser is struggling to download 15+ different videos at once.** 

**Highest Priority Action**: Compress your videos. If the video file is small, the website will fly.
