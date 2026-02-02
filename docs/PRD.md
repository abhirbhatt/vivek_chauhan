# Product Requirements Document (PRD)
## Portfolio Website - Filmmaker/Videographer Style

---

## 1. Project Overview

### 1.1 Purpose
Create a modern, minimalist portfolio website inspired by Filippo Forner's design aesthetic, featuring smooth animations, video-first content, and clean typography to showcase creative work.

### 1.2 Target Audience
- Potential clients seeking video/film services
- Industry professionals and collaborators
- Agencies and brands looking for creative talent

### 1.3 Core Objectives
- Showcase portfolio work through high-quality video previews
- Establish professional credibility through brand logos and testimonials
- Provide easy contact and booking functionality
- Create an immersive, emotion-driven user experience

---

## 2. Design System

### 2.1 Color Palette
```
Primary Background: #000000 (Black)
Text Primary: #FFFFFF (White)
Text Secondary: #CCCCCC (Light Gray)
Accent: Subtle whites and grays
Overlay: rgba(0, 0, 0, 0.3) for video overlays
```

### 2.2 Typography
- **Primary Font**: Sans-serif, likely Helvetica Neue, Inter, or similar modern font
- **Heading Sizes**:
  - H1 (Hero): 72-96px, Bold
  - H2 (Sections): 48-64px, Medium
  - H3 (Cards): 24-32px, Medium
  - Body: 16-18px, Regular
- **Letter Spacing**: Tight for headings, normal for body
- **Line Height**: 1.2-1.4 for headings, 1.6 for body

### 2.3 Layout Grid
- **Desktop**: 12-column grid with 20-40px gutters
- **Container Max Width**: 1400-1600px
- **Padding**: 40-80px horizontal on desktop, 20-30px on mobile
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## 3. Page Structure & Components

### 3.1 Header/Navigation
**Fixed Navigation Bar**

**Desktop Layout:**
- Logo: Top-left corner ("Filippo Forner" or your name)
- Navigation Links: Top-right corner
  - Works (anchor link to portfolio section)
  - LUTs/Resources (if applicable)
  - Contact

**Mobile Layout:**
- Hamburger menu (top-right)
- Full-screen overlay menu when opened

**Styling:**
- Background: Transparent initially, becomes solid black on scroll
- Height: 80-100px
- Sticky position
- Subtle backdrop blur effect
- Smooth transition on scroll

**Interactions:**
- Fade in on page load
- Background change on scroll (0% opacity to 100%)
- Hover effects on navigation links (underline or color change)

---

### 3.2 Hero Section

**Layout:**
- Full viewport height (100vh)
- Centered content with vertical and horizontal alignment

**Content Elements:**
1. **Main Heading (H1)**
   - Your name/brand name
   - Font size: 72-96px
   - Font weight: Bold
   - Animation: Fade in + slide up (delay: 0.2s)

2. **Subheading (H2)**
   - "Videographer — Available Worldwide" (or your tagline)
   - Font size: 18-24px
   - Font weight: Light/Regular
   - Animation: Fade in + slide up (delay: 0.4s)

3. **Navigation Links (Optional)**
   - Repeat main navigation or call-to-action buttons
   - Animation: Fade in (delay: 0.6s)

4. **Background**
   - Full-screen video (autoplay, loop, muted)
   - Fallback: High-quality image
   - Dark overlay (opacity: 0.3-0.5)

**Scroll Indicator:**
- Animated arrow or "Scroll" text at bottom
- Subtle bounce animation
- Fades out on scroll

---

### 3.3 Mission Statement Section

**Layout:**
- Full-width section
- Centered text alignment
- Padding: 120-200px vertical

**Content:**
- Headline (H3): 
  - "We believe storytelling lives in details, in timing and in silence. That's why we shape emotion through every frame."
  - Font size: 32-48px
  - Max-width: 800-1000px
  - Line height: 1.4
  - Font weight: Medium

**Animation:**
- Fade in + slide up on scroll into view
- Stagger animation if text is split into multiple lines

**Background:**
- Solid black or subtle gradient

---

### 3.4 Trust Signals Section ("Trusted By")

**Layout:**
- Full-width section
- Centered heading
- Logo carousel/grid

**Content Elements:**
1. **Section Heading**
   - "TRUSTED BY"
   - Font size: 12-14px
   - Letter spacing: 2-3px
   - Font weight: Bold
   - Uppercase
   - Centered

2. **Logo Display**
   - Horizontal scrolling carousel (auto-scroll)
   - Alternative: Grid layout (2-3 rows on mobile, 1 row on desktop)
   - Logo size: 80-120px height
   - Grayscale filter (opacity: 0.6-0.8)
   - Hover: Full color/opacity

**Animation:**
- Continuous horizontal scroll (infinite loop)
- Smooth, slow movement (20-30 seconds for full loop)
- Pause on hover (optional)

**Logos:**
- Include major brand logos you've worked with
- Keep consistent sizing and spacing
- 10-20px gap between logos

---

### 3.5 Portfolio/Works Section

**Section Header:**
- "WORKS" or "SELECTED PROJECTS"
- Centered or left-aligned
- Margin-bottom: 60-80px

**Grid Layout:**
- Desktop: 2 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 30-40px

**Project Card Component:**

1. **Structure:**
   ```
   [Video Container]
     ├── Background Video (hover-triggered)
     ├── Dark Overlay
     ├── Content Layer
     │   ├── Project Title (H3)
     │   └── "View Project" CTA
     └── Hover State Enhancements
   ```

2. **Default State:**
   - Video thumbnail/poster image
   - Aspect ratio: 16:9 or 4:3
   - Subtle gradient overlay (bottom to top)
   - Project title at bottom
   - "View Project" text below title

3. **Hover State:**
   - Video starts playing (autoplay, loop, muted)
   - Overlay darkens slightly (opacity: 0.4-0.6)
   - Title and CTA scale up slightly (1.05x)
   - Cursor changes to pointer
   - Subtle border or glow effect

4. **Styling:**
   - Border-radius: 8-12px
   - Overflow: hidden
   - Box-shadow: Subtle on hover
   - Transition: 0.3-0.5s ease

5. **Content:**
   - Project Title: 24-32px, white, bold
   - "View Project": 14-16px, white/gray, regular
   - Padding: 30-40px

**Projects to Include:**
- 6-8 featured projects minimum
- Each with unique video preview
- Link to dedicated project page

**Animation:**
- Stagger animation on scroll into view
- Each card fades in + slides up with 0.1s delay between cards

---

### 3.6 LUT/Resource Promotion Section

**Layout:**
- Full-width section or contained card
- Split layout: 50% video, 50% content (desktop)
- Stacked on mobile

**Content Elements:**
1. **Video Preview**
   - Background video showcasing LUT effects
   - Autoplay, loop, muted
   - Dark overlay

2. **Text Content**
   - Headline: "LUT Pack V1"
   - Subheading: "Free now. Free forever."
   - CTA Button: "Download"
   - Centered or left-aligned

**Styling:**
- Background: Dark or gradient
- Padding: 80-120px vertical
- Border-radius: 12-16px (if card-based)

**CTA Button:**
- Style: Outline or filled
- Padding: 16px 32px
- Font size: 16px
- Border: 1-2px solid white
- Hover: Background fill with white, text turns black
- Transition: 0.3s ease

---

### 3.7 Contact/CTA Section

**Layout:**
- Full-width section
- Centered content
- Large vertical padding (120-200px)

**Content:**
1. **Heading**
   - "Book an appointment" or "Let's create your next video. Together."
   - Font size: 48-72px
   - Max-width: 800px
   - Centered

2. **CTA Button**
   - "Contact us" or "Book Now"
   - Large button (18-20px font, 20px 48px padding)
   - Prominent placement
   - Hover: Scale or color change

**Background:**
- Optional: Video background with overlay
- Solid color alternative
- Gradient option

---

### 3.8 Footer

**Layout:**
- Full-width
- 3-column grid on desktop
- Stacked on mobile
- Padding: 60-80px vertical

**Content Sections:**

1. **Column 1: Branding/CTA**
   - Repeat CTA: "Book an appointment"
   - Subheading: "Let's create your next video. Together."
   - Contact button/link

2. **Column 2: Legal Links**
   - Privacy Policy
   - Terms and Conditions
   - Links styled as text (14-16px)

3. **Column 3: Contact Information**
   - Email: info@filippoforner.com (or yours)
   - Business details (Tax ID if applicable)
   - Address
   - Font size: 14-16px
   - Gray color (#CCCCCC)

**Styling:**
- Background: Black
- Border-top: 1px solid rgba(255,255,255,0.1)
- Text color: #CCCCCC
- Link hover: White

**Bottom Bar:**
- Copyright text
- Social media icons (optional)
- Font size: 12-14px
- Opacity: 0.6

---

## 4. Animations & Interactions

### 4.1 Page Load Animations
**Sequence:**
1. Navigation fades in (0.3s)
2. Hero heading slides up + fades in (0.5s, delay: 0.2s)
3. Hero subheading slides up + fades in (0.5s, delay: 0.4s)
4. Hero CTA fades in (0.5s, delay: 0.6s)

### 4.2 Scroll Animations
**Trigger:** When element is 20-30% into viewport

**Animation Types:**
- Fade in
- Slide up (20-40px movement)
- Stagger (0.1-0.2s delay between items)

**Sections to Animate:**
- Mission statement text
- Trust logos
- Project cards
- CTA sections

### 4.3 Hover Interactions

**Navigation Links:**
- Underline animation (0.3s ease)
- Color change to light gray

**Project Cards:**
- Video plays on hover
- Scale transform (1.02-1.05)
- Shadow increase
- Overlay darkening
- Text scale (1.05)

**Buttons:**
- Background color change
- Border color change
- Scale (1.05)
- Box-shadow increase

**Logo Grid:**
- Opacity change (0.6 to 1.0)
- Grayscale to color

### 4.4 Video Behavior
- **Hero Video:** Autoplay, loop, muted
- **Project Card Videos:** Play on hover, pause on leave
- **Background Videos:** Autoplay, loop, muted
- **Video Loading:** Show poster image until loaded

### 4.5 Smooth Scrolling
- Enable smooth scroll behavior
- Anchor links scroll smoothly to sections
- Easing function: ease-in-out
- Duration: 0.8-1.2s

---

## 5. Technical Requirements

### 5.1 Technology Stack

**Frontend Framework Options:**
- React.js + Next.js (recommended for SEO and performance)
- Vue.js + Nuxt.js
- Vanilla HTML/CSS/JavaScript
- Framer (the original site appears to use Framer)

**Animation Libraries:**
- Framer Motion (React)
- GSAP (GreenSock)
- AOS (Animate on Scroll)
- Intersection Observer API (vanilla)

**Video Handling:**
- HTML5 video element
- Lazy loading for performance
- WebM/MP4 format support
- Poster images for fallback

### 5.2 Performance Optimization

**Video Optimization:**
- Compress videos (target: <5MB per preview video)
- Use lower quality for background videos
- Implement lazy loading for videos below fold
- Use poster images
- Consider adaptive bitrate streaming for hero video

**Image Optimization:**
- WebP format with fallbacks
- Responsive images (srcset)
- Lazy loading
- Compress to 70-80% quality

**Code Optimization:**
- Minify CSS/JS
- Tree-shaking for unused code
- Code splitting
- Defer non-critical JavaScript

**Loading Strategy:**
- Critical CSS inline
- Preload hero video
- Lazy load portfolio videos
- Progressive enhancement

### 5.3 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 5.4 Accessibility (WCAG 2.1 Level AA)
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Captions/transcripts for videos (if containing dialogue)
- Sufficient color contrast (white on black: 21:1 ratio)
- Reduced motion support (prefers-reduced-motion)

---

## 6. Content Requirements

### 6.1 Text Content
- **Hero Headline:** Your name or brand
- **Hero Subheading:** Professional title + availability
- **Mission Statement:** 1-2 sentence philosophy (30-50 words)
- **Project Titles:** 2-5 words each
- **Project Descriptions:** 15-30 words (for project pages)
- **Footer CTA:** Engaging call-to-action
- **Contact Information:** Email, address, business details

### 6.2 Visual Assets

**Videos:**
- Hero background video (1920x1080, 10-30 seconds)
- Project preview videos (1-5 seconds each, 6-8 videos)
- LUT showcase video (optional)
- Contact section background video (optional)

**Images:**
- Logo (SVG preferred)
- Client/brand logos (PNG with transparency, 6-10 logos)
- Project thumbnail images (fallback for videos)
- Favicon (multiple sizes)

**Video Specifications:**
- Format: MP4 (H.264) or WebM
- Resolution: 1920x1080 minimum
- Frame rate: 24-30fps
- Compression: High quality, optimized for web
- File size: <5MB for preview videos, <15MB for hero

### 6.3 Additional Pages

**Works/Project Detail Pages:**
- Full project video or embedded Vimeo/YouTube
- Project description
- Client information
- Credits
- Related projects
- Back to portfolio link

**Contact Page:**
- Contact form (name, email, message)
- Email link
- Social media links
- Booking calendar integration (optional)
- Response time expectation

**LUT Page (if applicable):**
- LUT pack description
- Before/after examples
- Download link
- Usage instructions
- Terms of use

---

## 7. Responsive Design

### 7.1 Mobile Optimizations (< 768px)

**Navigation:**
- Hamburger menu
- Full-screen overlay menu
- Large tap targets (44x44px minimum)

**Hero Section:**
- Reduce heading size (48-60px)
- Stack content vertically
- Adjust video positioning

**Mission Statement:**
- Font size: 24-32px
- Padding: 60-80px vertical

**Portfolio Grid:**
- Single column
- Full-width cards
- Maintain aspect ratio

**Footer:**
- Stack columns vertically
- Center text alignment
- Increase touch target sizes

### 7.2 Tablet Optimizations (768px - 1024px)
- 2-column portfolio grid
- Adjusted typography sizes
- Maintain desktop-like navigation
- Optimized video sizes

### 7.3 Touch Interactions
- Remove hover states (use tap)
- Increase button sizes
- Add touch feedback (active states)
- Swipe gestures for portfolio (optional)

---

## 8. SEO Requirements

### 8.1 On-Page SEO
- Unique title tag (50-60 characters)
- Meta description (150-160 characters)
- H1 tag on each page (only one)
- Structured heading hierarchy (H1 > H2 > H3)
- Alt text for all images
- Semantic HTML5 markup

### 8.2 Technical SEO
- XML sitemap
- Robots.txt
- Canonical URLs
- Open Graph tags (Facebook/LinkedIn)
- Twitter Card tags
- Schema.org markup (Person/CreativeWork)
- Fast page load (<3s)
- Mobile-friendly design
- HTTPS

### 8.3 Content SEO
- Keyword-optimized content (filmmaker, videographer, [your location])
- Internal linking structure
- Descriptive URLs
- Optimized video titles and descriptions
- Blog/case studies (optional but recommended)

---

## 9. Analytics & Tracking

### 9.1 Analytics Tools
- Google Analytics 4
- Hotjar or Microsoft Clarity (heatmaps)
- Search Console

### 9.2 Events to Track
- Page views
- Video plays
- CTA button clicks
- Form submissions
- Portfolio item clicks
- Download clicks
- Scroll depth
- Time on page

### 9.3 Conversion Goals
- Contact form submissions
- Email link clicks
- Project inquiries
- Download completions

---

## 10. Development Phases

### Phase 1: Foundation (Week 1-2)
- Setup development environment
- Create design system (colors, typography, spacing)
- Build component library
- Setup responsive grid
- Implement navigation

### Phase 2: Core Pages (Week 3-4)
- Hero section with video
- Mission statement section
- Trust logos section
- Portfolio grid
- Basic animations

### Phase 3: Enhanced Features (Week 5)
- Project detail pages
- Contact form
- LUT/resource page
- Footer
- Advanced animations

### Phase 4: Optimization (Week 6)
- Performance optimization
- SEO implementation
- Browser testing
- Accessibility audit
- Mobile optimization

### Phase 5: Testing & Launch (Week 7)
- User testing
- Bug fixes
- Content population
- Final QA
- Deploy to production

---

## 11. Post-Launch Considerations

### 11.1 Maintenance
- Regular content updates (new projects)
- Video optimization and updates
- Performance monitoring
- Security updates
- Broken link checking

### 11.2 Potential Enhancements
- Blog section for case studies
- Client testimonials
- Behind-the-scenes content
- Newsletter signup
- Client portal/login area
- Booking/scheduling integration
- Multiple language support
- Instagram feed integration
- Awards/recognition section

### 11.3 Marketing Integration
- Email marketing platform integration
- Social media sharing
- Google My Business
- Video hosting (Vimeo/YouTube integration)
- Retargeting pixels

---

## 12. Design Specifications Summary

### 12.1 Spacing System
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
5xl: 128px
```

### 12.2 Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
```

### 12.3 Shadows
```
sm: 0 2px 4px rgba(0,0,0,0.1)
md: 0 4px 8px rgba(0,0,0,0.15)
lg: 0 8px 16px rgba(0,0,0,0.2)
xl: 0 16px 32px rgba(0,0,0,0.25)
```

### 12.4 Transitions
```
fast: 0.15s ease
normal: 0.3s ease
slow: 0.5s ease
```

---

## 13. Example Code Structure

### 13.1 Folder Structure
```
/
├── public/
│   ├── videos/
│   ├── images/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.jsx
│   │   ├── works/
│   │   ├── contact.jsx
│   │   └── luts.jsx
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components/
│   ├── utils/
│   └── data/
│       └── projects.js
├── package.json
└── next.config.js (or vite.config.js)
```

### 13.2 Key Component Patterns

**Project Card Component (Pseudo-code):**
```jsx
<ProjectCard>
  <VideoContainer>
    <Video src={videoSrc} poster={posterSrc} />
    <Overlay />
    <Content>
      <Title>{projectTitle}</Title>
      <CTA>View Project</CTA>
    </Content>
  </VideoContainer>
</ProjectCard>
```

**Navigation Component:**
```jsx
<Navigation>
  <Logo />
  <NavLinks>
    <Link to="#works">Works</Link>
    <Link to="/luts">LUTs</Link>
    <Link to="/contact">Contact</Link>
  </NavLinks>
  <MobileMenu />
</Navigation>
```

---

## 14. Success Metrics

### 14.1 Performance Targets
- Lighthouse Performance Score: >90
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

### 14.2 User Engagement Targets
- Average session duration: >2 minutes
- Bounce rate: <50%
- Portfolio click-through rate: >30%
- Contact form conversion: >5%

### 14.3 SEO Targets
- Lighthouse SEO Score: 100
- Mobile-friendly test: Pass
- Core Web Vitals: All green

---

## 15. Risk Assessment & Mitigation

### 15.1 Technical Risks
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Large video file sizes slow page load | High | Implement lazy loading, compress videos, use CDN |
| Browser compatibility issues | Medium | Test across browsers, use fallbacks, polyfills |
| Animations cause performance issues | Medium | Use CSS transforms, optimize animations, reduce motion option |

### 15.2 Content Risks
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Poor quality videos | High | Set quality standards, review process |
| Missing content delays launch | Medium | Content calendar, prioritize must-haves |
| Copyright issues with music/footage | High | Use licensed content, clear all rights |

---

## Appendix A: Competitor Analysis

**Similar Portfolio Websites:**
- Filippo Forner (reference site)
- [Research other filmmaker portfolios]
- Common patterns: video-first design, minimal UI, dark themes

**Key Differentiators:**
- Your unique style/perspective
- Specific industry focus
- Geographic availability
- Special services or packages

---

## Appendix B: Resources & Tools

**Design Tools:**
- Figma (for mockups)
- Adobe After Effects (video editing)
- Photoshop (image editing)

**Development Tools:**
- VS Code
- Git/GitHub
- Netlify/Vercel (hosting)
- Cloudflare (CDN)

**Testing Tools:**
- Chrome DevTools
- Lighthouse
- WebPageTest
- BrowserStack

**Video Optimization:**
- HandBrake (compression)
- FFmpeg (conversion)
- Vimeo/YouTube (hosting alternative)

---

## Version Control
- **Document Version:** 1.0
- **Date Created:** February 2, 2026
- **Last Updated:** February 2, 2026
- **Author:** [Your Name]
- **Status:** Draft / For Development

---

## Notes for Developer

1. **Start with the design system** - establish colors, typography, and spacing variables first
2. **Build mobile-first** - it's easier to expand than contract
3. **Optimize videos early** - don't wait until the end to compress
4. **Test animations on lower-end devices** - not everyone has high-end hardware
5. **Use a staging environment** - test everything before going live
6. **Set up version control from day one** - commit often
7. **Document your code** - your future self will thank you
8. **Accessibility is not optional** - build it in from the start
9. **Performance budget** - set limits and stick to them
10. **Get feedback early and often** - show work-in-progress to potential users

---

**END OF DOCUMENT**
