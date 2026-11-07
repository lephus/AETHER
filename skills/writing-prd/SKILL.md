---
name: writing-prd
description: Use when a product or tool idea has passed discovery (or is already agreed) and needs a one-page PRD with scope, user stories and testable acceptance criteria before design or planning starts
---

# Writing a PRD

## Overview

Phase **02 Specify**. A PRD (product requirements document) is the contract between your human partner, you, and every later skill. Design, plans and tests all trace back to it. Keep it to one page of real content: a long PRD nobody reads is worse than a short one everybody does.

**Announce at start:** "I'm using the writing-prd skill to write the requirements."

**Save to:** `docs/aether/prd/YYYY-MM-DD-<product>.md`

**Input:** the discovery note from `aether:problem-discovery` if one exists. Read it first; do not re-ask what it answers.

## Rules

- **No vague words.** "Fast", "easy", "user-friendly", "secure", "etc." are banned in requirements. Replace each with a number or an observable behavior, or mark `[TBD]`.
- **Every requirement is testable.** If you cannot say how a tester would check it, rewrite it.
- **Mark provenance.** Facts your human partner stated stay plain; your guesses carry `[ASSUMPTION]`; unknowns carry `[TBD]`.
- **Stable IDs.** `US-01` user stories, `BR-01` business rules, `OQ-01` open questions. Never renumber; retire instead.
- **Scope out loud.** An explicit "Out of scope" list prevents most scope creep.

## Template

```markdown
# PRD: <product> — v1
Date · Owner · Status: Draft | Approved

## 1. Problem & goal
One paragraph. Link the discovery note.

## 2. Users
| Role | What they need from v1 |

## 3. Scope
**In:** …  **Out (v1):** …

## 4. User stories
### US-01 <short title>
As a <role>, I want <capability>, so that <benefit>.
Acceptance criteria:
- Given <state>, when <action>, then <observable result>.
- Given …, when …, then … (error / empty case)

## 5. Business rules
- BR-01 …

## 6. Screens / flows
Ordered list of screens and what moves the user between them.

## 7. Non-functional requirements
Numbers only: load time, devices, languages, accessibility (WCAG AA), data retention.

## 8. Success metric
## 9. Open questions
- OQ-01 …
```

## Acceptance Criteria Checklist

For each user story, cover:
- the happy path,
- at least one error or invalid input,
- the empty state (no data yet),
- permissions (who must NOT be able to do it), when there is more than one role.

Write criteria as plain bullets in Given / When / Then form.

## Review With Your Human Partner

Present the PRD in sections short enough to read. Ask for approval explicitly. Change status to **Approved** only when they say so.

## Hand-off

After approval:
- new UI → `aether:ui-ux-design`;
- data, accounts, or integrations → `aether:architecture-design`;
- then `aether:writing-plans` for the first slice.

## Red Flags

| Thought | Reality |
|---------|---------|
| "The acceptance criteria are obvious" | Then they take one minute to write. Write them. |
| "We'll handle errors later" | Error cases are requirements. Put them in now. |
| "I'll fill the gaps with sensible defaults" | Mark them `[ASSUMPTION]` so your partner can see and correct them. |
