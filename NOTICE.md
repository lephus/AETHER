# Notice — third-party code

AETHER includes skills copied and adapted from **Superpowers** by Jesse Vincent
(https://github.com/obra/superpowers), MIT License, upstream version 7.0.2 (commit `22f0b46`).

Vendored skills (namespace renamed from `superpowers:` to `aether:`, working
directories renamed from `.superpowers/` and `docs/superpowers/` to `.aether/` and
`docs/aether/`; the brainstorming visual companion's remote logo and telemetry
removed):

brainstorming, dispatching-parallel-agents, executing-plans,
finishing-a-development-branch, receiving-code-review, requesting-code-review,
subagent-driven-development, systematic-debugging, test-driven-development,
using-git-worktrees, verification-before-completion, writing-plans, writing-skills.

Also adapted: `hooks/session-start`, `hooks/run-hook.cmd`, `hooks/*.json`, and the
harness reference notes in `skills/using-aether/references/` (except `cursor-tools.md`).

`skills/using-aether` is based on Superpowers' `using-superpowers`.

Skills written for AETHER: problem-discovery, writing-prd, ui-ux-design,
motion-animation, architecture-design, harness-setup, workflow-automation,
security-review, visual-qa, deploy-and-monitor.

To pull upstream improvements, run `scripts/sync-superpowers.sh` and review the diff.
