#!/usr/bin/env bash
set -euo pipefail

REF="${1:-53cddc42e39346fb8c6d5d612281a3b1add14e66}"
UPSTREAM="https://github.com/chaseai-yt/claudex-loop.git"
REQUIRED_SKILLS=(claudex-loop claudex-route codex-build codex-review)

echo "FDG Claudex Loop bootstrap"
echo "Pinned upstream ref: $REF"

command -v git >/dev/null 2>&1 || { echo "ERROR: git is required." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "ERROR: Python 3.10+ is required." >&2; exit 1; }
python3 - <<'PY'
import sys
raise SystemExit(0 if sys.version_info >= (3, 10) else 1)
PY

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git -C "$tmp" init -q
git -C "$tmp" remote add origin "$UPSTREAM"
git -C "$tmp" fetch -q --depth 1 origin "$REF"
git -C "$tmp" checkout -q --detach FETCH_HEAD

resolved="$(git -C "$tmp" rev-parse HEAD)"
if [[ "$resolved" != "$REF" ]]; then
  echo "ERROR: fetched commit $resolved does not match pinned commit $REF" >&2
  exit 1
fi

mkdir -p "$HOME/.agents/skills" "$HOME/.claude/skills"
for skill in "${REQUIRED_SKILLS[@]}"; do
  [[ -d "$tmp/skills/$skill" ]] || { echo "ERROR: missing upstream skill $skill" >&2; exit 1; }
  rm -rf "$HOME/.agents/skills/$skill" "$HOME/.claude/skills/$skill"
  cp -R "$tmp/skills/$skill" "$HOME/.agents/skills/"
  cp -R "$tmp/skills/$skill" "$HOME/.claude/skills/"
done

echo "Installed Claudex skills into ~/.agents/skills and ~/.claude/skills"

if command -v codex >/dev/null 2>&1; then
  codex --version || true
  codex login status || true
else
  echo "WARNING: Codex CLI is not installed/authenticated; the full loop cannot run yet."
fi

if command -v claude >/dev/null 2>&1; then
  claude --version || true
  claude auth status || true
else
  echo "WARNING: Claude Code CLI is not installed/authenticated; the full loop cannot run yet."
fi

echo "Bootstrap complete. Open a new Codex or Claude Code session so the skills are discovered."
