#!/usr/bin/env bash
# Pull the vendored skills from upstream Superpowers (MIT) and re-apply the
# AETHER renames. Review the resulting git diff before committing: local
# AETHER edits to vendored skills will show up as changes to re-apply.
#
# Usage: scripts/sync-superpowers.sh [git-ref]   (default: main)
set -euo pipefail
cd "$(dirname "$0")/.."

REF="${1:-main}"
VENDORED=(brainstorming dispatching-parallel-agents executing-plans
  finishing-a-development-branch receiving-code-review requesting-code-review
  subagent-driven-development systematic-debugging test-driven-development
  using-git-worktrees verification-before-completion writing-plans writing-skills)
REFS=(claude-code-tools codex-tools gemini-tools antigravity-tools)

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --quiet --depth 1 --branch "$REF" https://github.com/obra/superpowers.git "$tmp/sp"
echo "Upstream: $(git -C "$tmp/sp" rev-parse --short HEAD)"

for s in "${VENDORED[@]}"; do
  rm -rf "skills/$s"
  cp -R "$tmp/sp/skills/$s" "skills/$s"
done
for r in "${REFS[@]}"; do
  cp "$tmp/sp/skills/using-superpowers/references/$r.md" "skills/using-aether/references/$r.md"
done

files="$(grep -rlE 'superpowers:|\.superpowers/|docs/superpowers|using-superpowers/references' skills || true)"
for f in $files; do
  sed -i.bak -e 's/superpowers:/aether:/g' \
             -e 's#\.superpowers/#.aether/#g' \
             -e 's#docs/superpowers#docs/aether#g' \
             -e 's#using-superpowers/references#using-aether/references#g' "$f"
  rm -f "$f.bak"
done

echo "Re-check the brainstorming visual companion (skills/brainstorming/scripts/server.cjs):"
echo "AETHER removes its remote logo and telemetry. See NOTICE.md."
scripts/validate-skills.sh
git status --short
