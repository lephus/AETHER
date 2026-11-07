---
name: problem-discovery
description: Use when someone has a new product or tool idea and nothing is written yet - before any PRD, design, or code - to find out whether the problem is real, who has it, and what the smallest useful version is
---

# Problem Discovery

## Overview

Phase **01 Think**. The most expensive bug is building the wrong thing. This skill turns "I want to build X" into a one-page discovery note that says who has the problem, how they cope today, and what the smallest version worth building is — or says honestly that it is not worth building yet.

**Announce at start:** "I'm using the problem-discovery skill to check the problem before we build."

**Save to:** `docs/aether/discovery/YYYY-MM-DD-<topic>.md`

## When to Use

- A new product, app, tool, chatbot, or automation with no written spec.
- Your human partner describes a solution ("an app that…") but not the person or the pain.

Not for: a change to an existing product with known users — use `aether:brainstorming`.

## The Process

Ask **one question per message**. Offer choices when you can. Stop asking when each section below has a real answer.

1. **The person.** Who exactly has this problem? A role, a context, a moment ("second-year architecture student the week before a jury"), not "users".
2. **The pain.** What goes wrong today, how often, and what it costs them (time, money, grades, stress). Ask for one concrete recent example.
3. **Current workaround.** How do they cope now? Excel, Zalo groups, paper, a paid tool? The workaround is your real competitor.
4. **Evidence.** Has your human partner talked to anyone who has this problem? If not, write 5 interview questions for them to ask (open questions about past behavior, never "would you use…?").
5. **Alternatives.** Name 2–3 existing tools. Search the web if you can; say plainly when you could not check.
6. **Smallest useful version (MVP).** The one job the first version does end to end. List what is explicitly out.
7. **Success signal.** One measurable sign it worked (e.g. "5 classmates use it twice in one week").

## Go / No-Go

End with one of:

- **Go** — the problem is real and the MVP is small enough to build in the time available. Next: `aether:writing-prd`.
- **Go after evidence** — promising, but unvalidated. Give the interview script and stop.
- **Reframe** — the real problem is different from the requested solution. Say what it is.
- **No-go** — a free existing tool already solves it well, or the MVP cannot fit the time available. Say so kindly and specifically.

## Discovery Note Template

```markdown
# Discovery: <topic>
Date: YYYY-MM-DD · Status: Go | Go after evidence | Reframe | No-go

## Person
## Problem (with one real example)
## Current workaround
## Evidence so far
## Alternatives checked
| Tool | What it does | Why it is not enough |
## MVP — the one job
## Out of scope (v1)
## Success signal
## Open questions
```

## Red Flags

| Thought | Reality |
|---------|---------|
| "Everyone needs this" | Then name one person and their last bad day. |
| "Users would love feature Y" | Ask what they did last time, not what they would love. |
| "No competitors exist" | Usually means the search was too narrow, or nobody pays for it. |
| "MVP = all the features, but rough" | An MVP is fewer jobs, done fully. |

## Hand-off

On **Go**, commit the note and invoke `aether:writing-prd`.
