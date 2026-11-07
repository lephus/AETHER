# AETHER — rules for agents and contributors

## What this repo is

A skills pack (plugin) for AI coding agents. Each folder in `skills/` is one skill with a `SKILL.md`. The `using-aether` skill routes work through the lifecycle Think → Specify → Design → Build → Verify → Ship. Thirteen skills are vendored from Superpowers (MIT, see `NOTICE.md`); ten are AETHER's own.

## Commands

- Validate: `scripts/validate-skills.sh` — must print `OK` before any commit.
- Test the hook: `CLAUDE_PLUGIN_ROOT=$PWD bash hooks/session-start` — must print valid JSON.
- Check the visual-QA script: `node --check skills/visual-qa/scripts/capture.mjs`.
- Update vendored skills: `scripts/sync-superpowers.sh` then review `git diff`.

## Writing or changing a skill

- Follow `skills/writing-skills/SKILL.md`.
- Frontmatter: `name` equals the folder name; `description` starts with "Use when…", says when to trigger (not what the skill contains), under 1024 characters.
- Body: Overview (with phase number), "Announce at start" line, where its output is saved under `docs/aether/`, the process, a Red Flags table, and a Hand-off to the next skill.
- Reference other skills as `aether:<name>`. Never `superpowers:`.
- Keep skills harness-neutral. Tool-specific notes go in `skills/using-aether/references/<harness>-tools.md`.

## Vendored skills

Prefer leaving vendored Superpowers skills unchanged so upstream syncs stay clean. If a change is needed, keep it small and list it in `NOTICE.md`.

## Never

- Add third-party runtime dependencies to the plugin itself (scripts may use optional tools such as Playwright, and must say how to install them).
- Add telemetry or remote assets.
- Commit secrets.
- Change a skill's behavior without saying why in `CHANGELOG.md`.
