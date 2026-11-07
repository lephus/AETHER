---
name: ui-ux-design
description: Use when creating or redesigning any user interface - a page, landing page, portfolio, dashboard, app screen or component - before writing UI code, to set the visual direction, design tokens, layout and accessibility rules so the result does not look generic
---

# UI/UX Design

## Overview

Phase **03 Design**. AI-generated interfaces tend to converge on the same look: centered hero, purple gradient, three feature cards, rounded everything. That is the average of the training data, not a design. This skill makes deliberate choices first — direction, tokens, layout — and writes them down, so every screen after that is consistent and recognisably *this* product.

**Announce at start:** "I'm using the ui-ux-design skill to set the design direction before coding the UI."

**Save to:** `docs/aether/design/design-system.md` and the tokens file in code (see below).

## The Process

### 1. Context (ask, one question per message)

- Who is the audience and what is the one thing they must do on this screen?
- Brand inputs that already exist: logo, colors, fonts, a site they admire. Ask for 2–3 references (a URL, a screenshot, a moodboard).
- Device priority: phone-first or desktop-first?
- Tone, as three adjectives (e.g. "calm, precise, architectural").

### 2. Pick a direction

Offer **2–3 named directions** in one message, each with: one-line idea, type pairing, palette (5 colors with hex), and one signature detail (e.g. "hairline grid lines like a drafting table"). Let your human partner pick. If the brainstorming visual companion is available (`aether:brainstorming`), show the directions as mockups.

### 3. Write the tokens

Tokens are the single source of truth. Put them in code before any component:

- **Color:** background, surface, text, text-muted, border, primary, primary-contrast, success, warning, danger. Define light and dark.
- **Type:** 1–2 families; a scale of 5–7 sizes (e.g. 12/14/16/20/24/32/48 px); line-heights; weights in use.
- **Space:** a 4 px or 8 px scale (4, 8, 12, 16, 24, 32, 48, 64).
- **Radius, border width, shadow:** 2–3 values each, no more.
- **Motion:** durations and easings — hand off to `aether:motion-animation` for detail.

Use CSS custom properties (`:root { --color-primary: … }`) or the project's existing system (Tailwind theme, CSS-in-JS theme). Never hard-code a hex value in a component once tokens exist.

### 4. Layout

- Start from content, not from a template: list what the screen must show, in priority order.
- One primary action per screen; make it the most visually prominent element.
- Use a grid (e.g. 4 columns on phone, 12 on desktop) and align to it.
- Whitespace is a tool: group related things closer than unrelated ones.
- Design the **empty, loading, error and full** states, not only the happy one.

### 5. Accessibility (non-negotiable)

- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI controls). Check, don't guess.
- Tap targets ≥ 44 × 44 px; visible focus ring on every interactive element.
- Never rely on color alone to carry meaning; pair it with text or an icon.
- Every image has alt text; every input has a label.
- Respect the system font size; layouts must survive 200 % zoom.

### 6. Write the design system note

`docs/aether/design/design-system.md`: chosen direction and why, token table, type scale, component inventory (buttons, inputs, cards, nav…) with their states, and do / don't examples. Commit it with the tokens.

## Anti-generic checklist

Before showing any UI, check it does not default to:
- purple-to-blue gradients, glassmorphism or emoji icons unless the direction asked for them;
- everything centered; three identical cards in a row as the only layout idea;
- placeholder copy ("Lorem ipsum", "Feature 1", "Revolutionize your workflow");
- more than one accent color competing for attention.

Use real copy from the PRD. If the copy does not exist, write a believable first draft and mark it `[COPY TBD]`.

## Hand-off

- Motion or micro-interactions wanted → `aether:motion-animation`.
- Then `aether:writing-plans` / build.
- When the UI is built → `aether:visual-qa` before claiming it is done.

## Red Flags

| Thought | Reality |
|---------|---------|
| "I'll just make it look modern" | "Modern" is not a direction. Pick one with your partner. |
| "Tokens are overkill for one page" | One page becomes five. Tokens take ten minutes. |
| "Accessibility can come later" | Retrofitting contrast and focus breaks the design. Do it now. |
| "The happy state is enough for the demo" | Demos hit empty and error states. Design them. |
