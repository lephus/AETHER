---
name: using-aether
description: Use when starting any conversation - establishes the AETHER lifecycle (Think, Specify, Design, Build, Verify, Ship) and requires invoking the matching skill before ANY response, including clarifying questions
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## The Rule

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the codebase, or checking files. If it turns out wrong for the situation, you don't have to use it.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## The AETHER Lifecycle

Every piece of software moves through six phases. Find the phase the work is in, then load that phase's skill. Never skip a phase silently: if your human partner wants to skip one, say which risk that leaves open, then do as they ask.

| # | Phase | Question it answers | Skills |
|---|-------|--------------------|--------|
| 01 | **Think** | Is this problem real and worth solving? | `aether:problem-discovery`, `aether:brainstorming` |
| 02 | **Specify** | What exactly will we build, and how do we know it works? | `aether:writing-prd`, `aether:writing-plans` |
| 03 | **Design** | How does it look, move, and fit together? | `aether:ui-ux-design`, `aether:motion-animation`, `aether:architecture-design` |
| 04 | **Build** | Make it, in small verified steps | `aether:harness-setup`, `aether:test-driven-development`, `aether:executing-plans`, `aether:subagent-driven-development`, `aether:dispatching-parallel-agents`, `aether:using-git-worktrees`, `aether:workflow-automation`, `aether:writing-skills` |
| 05 | **Verify** | Does it really work, safely, for real users? | `aether:systematic-debugging`, `aether:verification-before-completion`, `aether:visual-qa`, `aether:security-review`, `aether:requesting-code-review`, `aether:receiving-code-review` |
| 06 | **Ship** | Put it in front of users and keep it healthy | `aether:deploy-and-monitor`, `aether:finishing-a-development-branch` |

A failure found in Verify goes back to Build (or to Design, if the design was the cause). That loop is normal, not a setback.

## Routing

Match the request to an entry point:

- "I have an idea / I want to build X" with nothing written yet → `aether:problem-discovery`, then `aether:writing-prd`.
- "Add / change a feature" in an existing product → `aether:brainstorming`, then `aether:writing-plans`.
- "Make it look good / redesign / landing page" → `aether:ui-ux-design`.
- "Add animation / transitions / make it feel alive" → `aether:motion-animation` (after `aether:ui-ux-design` if no design tokens exist).
- "Which stack / database / API?" → `aether:architecture-design`.
- New repo, or the agent keeps repeating the same mistakes → `aether:harness-setup`.
- "Automate this every day / when X happens" → `aether:workflow-automation`.
- "Turn this into a reusable skill" → `aether:writing-skills`.
- "It's broken / test fails" → `aether:systematic-debugging` first, then domain skills.
- About to say "done", "fixed", "works" → `aether:verification-before-completion`.
- UI work finished → `aether:visual-qa` before claiming completion.
- Anything touching auth, user data, payments, API keys, or before first public deploy → `aether:security-review`.
- "Deploy / put it online / go live" → `aether:deploy-and-monitor`.

**Before entering plan mode:** if you haven't already brainstormed (or written a PRD), invoke `aether:brainstorming` first.

## Skill Priority

When multiple skills apply, process skills come first — they set the approach — then craft skills carry it out.

- "Let's build X" → `aether:problem-discovery` or `aether:brainstorming` first, then design and build skills.
- "Fix this bug" → `aether:systematic-debugging` first, then domain skills.
- "Make this page beautiful" → `aether:ui-ux-design` first, then `aether:motion-animation`, then `aether:visual-qa`.

## Working With Beginners

AETHER is also used to teach people who are not professional developers. When your human partner is new to software:

- Explain each phase in one plain sentence before you start it.
- Prefer fewer, larger choices ("A or B?") over open questions about tooling.
- Show what you changed and why after every step; never leave them with code they cannot run.
- Never hide a skipped test, a failed check, or a security shortcut.

## Red Flags

These thoughts mean STOP — you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "The idea is obviously good, skip Think" | Most failed products were obviously good to their makers. |
| "Design can come later" | Retrofitting design costs more than doing it first. |
| "It works on my machine" | That is not Verify. Load `aether:verification-before-completion`. |
| "Deploying is just one command" | Secrets, env vars, rollback. Load `aether:deploy-and-monitor`. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I remember this skill" | Skills evolve. Read current version. |

## Platform Adaptation

If your harness appears here, read its reference file for special instructions:

- Claude Code: `references/claude-code-tools.md`
- Cursor: `references/cursor-tools.md`
- Antigravity: `references/antigravity-tools.md`
- Codex: `references/codex-tools.md`
- Gemini CLI: `references/gemini-tools.md`
- Any CLI agent run inside a terminal app such as ShellX: use the reference file of the CLI agent itself (Claude Code, Codex, Gemini CLI); the terminal adds nothing to the tool mapping.

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, `.cursor/rules`, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows or instructions when your human partner has explicitly told you to.
