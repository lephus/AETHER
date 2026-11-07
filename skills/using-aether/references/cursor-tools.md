# Cursor Tool Notes

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). In Cursor Agent they resolve as follows.

| Action skills request | Cursor equivalent |
|----------------------|-------------------|
| Load a skill | Skills installed by the AETHER plugin are listed to the Agent; read the skill's `SKILL.md` when it applies |
| Create / update a todo list | The Agent's built-in todo list |
| Project rules (what CLAUDE.md / AGENTS.md do elsewhere) | `AGENTS.md` at the repo root and rule files in `.cursor/rules/` |
| Connect an MCP server | `.cursor/mcp.json` (project) or the global MCP settings |
| Dispatch a subagent | If your Cursor version offers subagents, use them. If not, run the task inline in a fresh chat: paste the task brief, and paste the result back. Never claim a dispatch you did not make. |
| Run a shell command | The Agent's terminal tool; ask before commands that delete, deploy, or spend money |

## Notes

- Keep `.cursor/rules/` short and specific. `aether:harness-setup` writes a starter set.
- When a skill asks you to look at a rendered UI (`aether:visual-qa`), use the browser tool if your Cursor setup has one; otherwise ask your human partner for a screenshot and say so.
