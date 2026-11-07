#!/usr/bin/env bash
# Validate every skills/*/SKILL.md: frontmatter present, name matches folder,
# description present and under 1024 chars, no leftover upstream namespace,
# and every aether:<skill> reference points at an existing skill.
set -euo pipefail
cd "$(dirname "$0")/.."

fail=0
names=()
for dir in skills/*/; do
  skill="$(basename "$dir")"
  file="$dir/SKILL.md"
  names+=("$skill")
  if [ ! -f "$file" ]; then echo "FAIL $skill: missing SKILL.md"; fail=1; continue; fi
  if [ "$(head -n1 "$file")" != "---" ]; then echo "FAIL $skill: no frontmatter"; fail=1; continue; fi
  fm="$(awk 'NR==1{next} /^---$/{exit} {print}' "$file")"
  name="$(printf '%s\n' "$fm" | sed -n 's/^name: *//p')"
  desc="$(printf '%s\n' "$fm" | sed -n 's/^description: *//p')"
  [ "$name" = "$skill" ] || { echo "FAIL $skill: name '$name' does not match folder"; fail=1; }
  [ -n "$desc" ] || { echo "FAIL $skill: empty description"; fail=1; }
  [ "${#desc}" -le 1024 ] || { echo "FAIL $skill: description ${#desc} chars > 1024"; fail=1; }
done

if grep -rn "superpowers:" skills >/dev/null; then
  echo "FAIL: leftover 'superpowers:' references:"; grep -rn "superpowers:" skills; fail=1
fi

refs="$(grep -rhoE 'aether:[a-z0-9-]+' skills hooks README.md 2>/dev/null | sort -u | sed 's/aether://')"
for r in $refs; do
  found=0
  for n in "${names[@]}"; do [ "$n" = "$r" ] && found=1; done
  [ "$found" = 1 ] || { echo "FAIL: reference aether:$r has no skill folder"; fail=1; }
done

if [ "$fail" = 0 ]; then echo "OK: ${#names[@]} skills valid"; fi
exit "$fail"
