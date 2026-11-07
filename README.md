<div align="center">

<img src="assets/aether-logo.png" width="96" alt="AETHER logo">

# AETHER

**Reusable AI skills for modern developers — and for anyone learning to build software with AI.**

Think → Specify → Design → Build → Verify → Ship

</div>

AETHER is a skills pack for AI coding agents (Claude Code, Cursor, Antigravity, Codex, Gemini CLI). It makes your agent work through the whole product lifecycle instead of jumping straight to code: check the problem, write the requirements, design the interface and its motion, build in small tested steps, verify for real, and ship safely.

It is built on [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent (MIT) — its planning, TDD, debugging and code-review skills are included — and adds the skills a product needs around the code: discovery, PRD, UI/UX design, animation, architecture, harness setup, security review, visual QA and deployment.

## The lifecycle

| # | Phase | Skills |
|---|-------|--------|
| 01 | **Think** — problem discovery, idea validation | `problem-discovery` ✦, `brainstorming` |
| 02 | **Specify** — PRD, requirements, user stories | `writing-prd` ✦, `writing-plans` |
| 03 | **Design** — UI/UX, motion, architecture, database | `ui-ux-design` ✦, `motion-animation` ✦, `architecture-design` ✦ |
| 04 | **Build** — AI-assisted coding, harness, automation | `harness-setup` ✦, `test-driven-development`, `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`, `workflow-automation` ✦, `writing-skills` |
| 05 | **Verify** — testing, debugging, review, security | `systematic-debugging`, `verification-before-completion`, `visual-qa` ✦, `security-review` ✦, `requesting-code-review`, `receiving-code-review` |
| 06 | **Ship** — deployment, monitoring | `deploy-and-monitor` ✦, `finishing-a-development-branch` |

✦ = written for AETHER. The others come from Superpowers.

The `using-aether` skill is loaded at the start of every session (by a session-start hook where the harness supports one). It tells the agent which phase the work is in and which skill to use. A failure found in Verify loops back to Build.

Every skill writes its output to `docs/aether/` in your project (discovery notes, PRDs, design system, ADRs, plans, QA screenshots, security reviews, runbook), so the whole history of a product stays in its repo.

## Installation

Install separately for each agent you use.

### Claude Code

```bash
/plugin marketplace add lephus/AETHER
/plugin install aether@aether
```

### Antigravity

```bash
agy plugin install https://github.com/lephus/AETHER
```

Reinstall with the same command to update.

### Cursor

Add this repository as a plugin from the Cursor plugin settings / `/add-plugin` using the GitHub URL `https://github.com/lephus/AETHER`, or clone it and point Cursor at the folder.

### Codex

Clone the repo and add it as a local plugin (it ships `.codex-plugin/plugin.json` and `.agents/plugins/marketplace.json`).

### Gemini CLI

```bash
gemini extensions install https://github.com/lephus/AETHER
```

### In a terminal app (ShellX and others)

AETHER runs inside the CLI agent, so a terminal such as [ShellX](https://shellx.pro) needs nothing extra: install AETHER for the agent you run there (Claude Code, Codex, Gemini CLI), and you can follow and answer the agent from your phone while it works through the lifecycle.

## Quick start

Open your agent in an empty folder and say:

> I have an idea for an app: …

The agent should announce `problem-discovery`, ask you one question at a time, and write `docs/aether/discovery/…`. From there it hands off phase by phase. You can also ask for a phase directly: "design a landing page", "add animations", "set up the harness", "review security", "deploy this".

## Repository layout

```
skills/<name>/SKILL.md      one folder per skill (+ scripts, references)
hooks/                      session-start hook that loads using-aether
.claude-plugin/ .cursor-plugin/ .antigravity-plugin/ .codex-plugin/ gemini-extension.json
scripts/validate-skills.sh  checks frontmatter and cross-references
scripts/sync-superpowers.sh pulls upstream Superpowers skills and re-applies renames
docs/course-map.md          how the skills map to the 15-session "AI Vibe Coding" course
```

## Contributing

Read `AGENTS.md` first. Run `scripts/validate-skills.sh` before every commit. New skills follow `skills/writing-skills/SKILL.md`: a `description` that starts with "Use when…", a clear process, red flags, and a hand-off to the next phase.

## License

MIT — see `LICENSE`. Superpowers attribution and the list of vendored files are in `NOTICE.md`.

---

## Tiếng Việt — dành cho sinh viên

AETHER là bộ skill giúp AI agent làm phần mềm theo đúng 6 bước: **Think** (kiểm chứng ý tưởng) → **Specify** (viết PRD) → **Design** (giao diện, animation, kiến trúc) → **Build** (code cùng AI) → **Verify** (test, debug, bảo mật) → **Ship** (đưa lên mạng). Cài theo hướng dẫn ở trên cho công cụ bạn dùng (Claude Code trong ShellX, Cursor hoặc Antigravity), rồi mở agent và nói: *"Mình có ý tưởng làm app …"*. Lộ trình 15 buổi của học phần xem tại `docs/course-map.md`.
