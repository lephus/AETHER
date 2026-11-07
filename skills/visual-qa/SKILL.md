---
name: visual-qa
description: Use after building or changing any user interface and before claiming it is done - to look at the rendered result at phone, tablet and desktop sizes, in light and dark mode and with reduced motion, and fix layout, accessibility and motion problems with screenshots as evidence
---

# Visual QA

## Overview

Phase **05 Verify**. Code that compiles can still render badly: text overflowing on a phone, a button hidden behind the keyboard, white text on a white card in dark mode. You cannot know how a UI looks without looking at it. This skill makes you look, systematically, and keep the evidence.

**Announce at start:** "I'm using the visual-qa skill to check the rendered UI."

**Save evidence to:** `docs/aether/qa/YYYY-MM-DD-<feature>/` (screenshots + `report.md`).

## 1. Get the UI running

Start the dev server (or use the preview deploy URL). Note the exact URL and commit.

## 2. Capture

Use whatever can render the page, in this order of preference:

1. **The bundled script** (needs Node and Playwright — `npm i -D playwright` then `npx playwright install chromium` if not present):
   ```bash
   node <path-to-this-skill>/scripts/capture.mjs <url> docs/aether/qa/<date>-<feature> [/path2 /path3 ...]
   ```
   It saves screenshots at 375, 768 and 1440 px wide, light and dark, plus `checks.json` with automatic findings (horizontal overflow, images without alt, inputs without labels, tiny tap targets, console errors).
2. **The harness's built-in browser** (e.g. Antigravity's browser, a browser MCP server, Claude in Chrome).
3. **Your human partner's screenshots** — ask for the three widths. Say plainly that you could not render it yourself.

Never describe a screenshot you did not actually see.

## 3. Review each screenshot

Look at every image and check:

- **Layout:** nothing cut off or overlapping; no horizontal scroll on phone; alignment follows the grid; spacing consistent with tokens.
- **Hierarchy:** the primary action is the most prominent element; headings read in order.
- **States:** empty, loading, error and long-content versions (very long names, 0 items, 100 items).
- **Dark mode:** every text readable; no hard-coded white/black backgrounds.
- **Accessibility:** contrast looks sufficient (verify borderline cases with a contrast checker); focus ring visible when tabbing; tap targets large enough.
- **Copy:** no placeholder text, no typos, consistent language.
- **Motion:** interactions animate as specified in the design system; with `prefers-reduced-motion: reduce` (the script captures a reduced-motion run) nothing slides or bounces.

## 4. Fix and re-capture

For each problem: fix it, re-capture the affected view, and compare before/after. Keep both images.

## 5. Report

```markdown
# Visual QA — <feature> — <date>
URL · Commit
| # | View (width/theme) | Problem | Fix | Before | After |
## Automatic checks (checks.json summary)
## Not checked (and why)
```

## Hand-off

All issues fixed or explicitly accepted → `aether:verification-before-completion`.

## Red Flags

| Thought | Reality |
|---------|---------|
| "The code looks right, so the page is right" | Rendering is the only proof. Look. |
| "I checked desktop" | Most users are on a phone. Check 375 px. |
| "Dark mode is optional" | If the OS is dark and you support `prefers-color-scheme`, it is live. |
| "I can describe what it probably looks like" | Never. Capture it or ask for a screenshot. |
