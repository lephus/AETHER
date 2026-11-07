---
name: workflow-automation
description: Use when someone wants a repeated task to run by itself - on a schedule, on a form submit, on a new email or file - with tools such as n8n, Make, Zapier, GitHub Actions or a headless coding agent, including steps that call an LLM
---

# Workflow Automation

## Overview

Phase **04 Build**. An automation is a small product: it has users, inputs, failure modes and costs. Design it on paper first, build it in the smallest working slice, and make failures loud.

**Announce at start:** "I'm using the workflow-automation skill to design the automation."

**Save to:** `docs/aether/workflows/<name>.md`

## 1. Is it a workflow or an agent?

- **Workflow** — the steps are known and always the same ("when a form is submitted, summarize it with an LLM, add a row, email the team"). Build it in n8n / Make / Zapier / GitHub Actions. Cheaper, predictable, easy to debug.
- **Agent** — the steps depend on what it finds ("triage new issues and decide what to do"). Use a headless coding agent or an agent framework, with tight permissions and a human checkpoint.

Default to a workflow. Use an agent only for the step that truly needs judgment.

## 2. Design on one page

```markdown
# Workflow: <name>
Owner · Runs: <trigger> · Expected volume: <n per day>

## Trigger
## Steps
1. <step> — tool — input → output
2. …
## Human checkpoint (if any)
## Failure handling
| Step | What can fail | What happens (retry / alert / skip) |
## Data & secrets
Which accounts and keys it uses; where credentials are stored.
## Cost
LLM calls per run × price estimate; platform plan limits.
## Test cases
3 example inputs, including one bad one, and the expected result.
```

Review it with your human partner before building.

## 3. LLM steps

- Prompt in one place, versioned; include 1–2 examples of good output.
- Ask for structured output (JSON with a fixed schema) and validate it before the next step uses it.
- Set a max token limit and a timeout.
- Never pass secrets or unnecessary personal data into the prompt.
- Log input/output (minus personal data) so a wrong answer can be traced.

## 4. Build in slices

1. Trigger + one step, run by hand with the bad test case.
2. Add steps one at a time; run all test cases after each.
3. Add failure handling: retries with backoff for network steps, an alert (email, chat) on final failure — never fail silently.
4. Turn on the schedule / live trigger last.

## 5. Headless agents

When a coding agent runs unattended (scheduled, in CI):
- give it the narrowest permissions that work, and no production credentials;
- have it open a pull request or write a report — not push or deploy directly;
- record the exact prompt and the run log.

## Hand-off

Run `aether:verification-before-completion` with the test cases before saying it works. If it handles personal data or money → `aether:security-review`.

## Red Flags

| Thought | Reality |
|---------|---------|
| "Make the whole thing an agent" | Agents are slower, costlier and less predictable. Workflow first. |
| "It worked once, turn it on" | Run the bad input. Watch it fail properly. |
| "Errors will show up in the logs" | Nobody reads logs. Send an alert. |
| "The LLM output is always JSON" | Until it isn't. Validate. |
