---
name: harness-setup
description: Use when starting work in a new or unfamiliar repository, when an AI agent keeps repeating the same mistakes, or when asked to set up rules files (AGENTS.md, CLAUDE.md, .cursor/rules), permissions, hooks or MCP servers for Claude Code, Cursor, Antigravity, Codex or Gemini CLI
---

# Harness Setup

## Overview

Phase **04 Build**. The harness is everything around the model: rules files, permissions, tools, hooks and context. A good harness means the agent follows the project's conventions without being reminded, cannot do dangerous things by accident, and checks its own work automatically.

**Announce at start:** "I'm using the harness-setup skill to configure the agent environment."

## 1. Inspect before writing

- Which agents will be used on this repo (ask): Claude Code, Cursor, Antigravity, Codex, Gemini CLI — possibly several, possibly inside a terminal app such as ShellX.
- What exists already: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/`, `.claude/settings.json`, `.mcp.json`, CI config, linters, test commands.
- Never overwrite existing rules. Merge, and show the diff.

## 2. One source of truth for rules

Write the rules once in **`AGENTS.md`** at the repo root (read by Codex, Antigravity, Cursor and many other agents). Point the others at it instead of duplicating:

- `CLAUDE.md` → a single line `@AGENTS.md` plus anything Claude-Code-specific.
- `GEMINI.md` → `@AGENTS.md`.
- `.cursor/rules/` → a short rule that says to follow `AGENTS.md`, plus file-pattern-specific rules if needed.

## 3. What goes in AGENTS.md

Keep it under ~150 lines. Specific beats general — "use `pnpm test`" beats "write good tests".

```markdown
# <Project> — agent rules

## What this is
One paragraph: product, users, link to PRD and architecture docs.

## Commands
- Install: …
- Dev server: …
- Test: …          (must pass before claiming done)
- Lint/format: …

## Structure
Where things live; which folders not to touch (generated, vendor).

## Conventions
Language, framework versions, naming, styling (use design tokens from docs/aether/design), state management.

## Never
- Commit secrets or .env files.
- Disable tests or lint rules to make a check pass.
- Run destructive commands (rm -rf, DROP, force-push, deploy) without asking.

## Workflow
Follow the AETHER lifecycle (skill: using-aether). Plans in docs/aether/plans.
```

## 4. Permissions

- Allow without asking: reading files, running tests, lint, the dev server.
- Ask first: installing packages, network calls to new hosts, database migrations, git push.
- Deny: reading `.env*` and key files, `rm -rf`, force-push, production deploys from the agent.

Configure this in the harness's own settings (e.g. `.claude/settings.json` permissions for Claude Code; the agent's allow/deny settings in Cursor or Antigravity). Explain each entry to your human partner.

## 5. Hooks (automatic checks)

Add at most two to start:
- after the agent edits a file → run the formatter on that file;
- before the agent finishes / stops → run the fast test suite and report failures.

Hooks must be fast (< ~10 s) or they will be disabled. Test each hook once and show the output.

## 6. MCP servers

Add only servers the PRD needs (e.g. database, docs, design files). For each: what it can read/write, where its credentials live, and why it is needed. Prefer read-only scopes.

## 7. Prove it works

Run the same small task twice — before and after the harness — and compare: did the agent use the right commands, follow conventions, avoid forbidden actions? Report the difference to your human partner.

## Red Flags

| Thought | Reality |
|---------|---------|
| "I'll write a long, thorough rules file" | Long rules get ignored. Short and specific. |
| "Copy the same rules into every file" | They drift. One source, pointers elsewhere. |
| "Allow everything so the agent isn't blocked" | Then nothing stops the one bad command. |
| "Hooks can run the full test suite" | Slow hooks get turned off. Keep them fast. |
