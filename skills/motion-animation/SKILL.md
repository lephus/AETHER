---
name: motion-animation
description: Use when adding animation, transitions, micro-interactions, scroll effects or page transitions to a web or app UI - to give each motion a purpose, consistent timing and easing, good performance, and a reduced-motion fallback
---

# Motion & Animation

## Overview

Phase **03 Design** (and polish before **05 Verify**). Good motion explains: it shows where something came from, confirms an action, or guides the eye. Bad motion decorates, delays, and makes some people physically unwell. Every animation must earn its place.

**Announce at start:** "I'm using the motion-animation skill to design the motion."

**Prerequisite:** design tokens from `aether:ui-ux-design`. If none exist, add motion tokens first (step 2) and say so.

## 1. Give every motion a job

Before animating anything, name its purpose. If none fits, don't animate it.

| Purpose | Example |
|---------|---------|
| **Feedback** | Button press, toggle, saved check-mark |
| **Orientation** | Panel slides from the side it lives on; modal grows from its trigger |
| **Continuity** | List item moves to its new position instead of jumping |
| **Attention** | A single new notification pulses once |
| **Delight / brand** | Hero entrance on first load — at most one per page |

## 2. Motion tokens

Define once, reuse everywhere (CSS custom properties or the project's theme):

```css
:root {
  --motion-duration-instant: 100ms;  /* hover, press */
  --motion-duration-fast: 150ms;     /* small UI: toggles, tooltips */
  --motion-duration-base: 250ms;     /* panels, cards, menus */
  --motion-duration-slow: 400ms;     /* page / large surface transitions */
  --motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* entering */
  --motion-ease-in: cubic-bezier(0.7, 0, 0.84, 0);      /* leaving */
  --motion-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* moving on screen */
}
```

Rules of thumb:
- Micro-interactions 100–200 ms; larger surfaces 200–400 ms; nothing the user waits on above 500 ms.
- Enter with ease-out, exit with ease-in and ~20–30 % shorter than the enter.
- Larger distance → slightly longer duration. Same kind of element → same timing.
- Stagger lists by 30–50 ms per item, capped at ~6 items.

## 3. Choose the tool

| Need | Use |
|------|-----|
| Hover, focus, simple state changes | CSS `transition` |
| Keyframed loops, entrance sequences | CSS `@keyframes` |
| Imperative, cancellable, JS-driven | Web Animations API (`element.animate`) |
| React layout / presence / gestures | The project's existing motion library (e.g. Motion / Framer Motion); add one only with your partner's OK |
| Complex timelines, scroll-scrubbed scenes | GSAP (check its license fits the project) |
| Page-to-page transitions | View Transitions API where supported, with a no-animation fallback |

Prefer the lightest tool that does the job. Do not add a dependency for one fade.

## 4. Performance

- Animate only `transform` and `opacity` where possible. Avoid animating `width`, `height`, `top`, `left`, `box-shadow`, `filter` on large areas.
- Never animate layout on scroll handlers; use `IntersectionObserver` or CSS scroll-driven animations.
- Target 60 fps; test on a mid-range phone or with CPU throttling.
- Use `will-change` sparingly and remove it after the animation.

## 5. Accessibility

Always honor reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Replace movement with a simple opacity change rather than removing feedback entirely. No flashing more than 3 times per second. Anything that moves for more than 5 seconds needs a pause control. Motion must never be the only way information is conveyed.

## 6. Document

Add a "Motion" section to `docs/aether/design/design-system.md`: tokens, the purpose table for this product, and which components animate and how.

## Hand-off

Build it, then run `aether:visual-qa`, which includes a motion and reduced-motion check.

## Red Flags

| Thought | Reality |
|---------|---------|
| "Let's animate everything on scroll" | Users came to read, not to wait. One entrance per page. |
| "It looks smooth on my laptop" | Test throttled or on a phone. |
| "Reduced motion is an edge case" | It is a medical need for some users and a one-block fix. |
| "Let's add a library for this" | CSS likely does it. Ask before adding dependencies. |
