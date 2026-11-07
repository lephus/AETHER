---
name: architecture-design
description: Use when a product needs a tech stack, data model, database schema, API contract, authentication, or an LLM/RAG integration decided - after the PRD and before the implementation plan - so the build starts from written, reviewable decisions
---

# Architecture Design

## Overview

Phase **03 Design**. Architecture is the set of decisions that are expensive to change later: where data lives, who can see it, how parts talk. Make them on purpose, write them down, and keep them as simple as the PRD allows.

**Announce at start:** "I'm using the architecture-design skill to decide the structure before planning."

**Save to:** `docs/aether/architecture/overview.md` and one ADR per significant decision in `docs/aether/architecture/adr/NNNN-<title>.md`.

**Input:** the approved PRD (`aether:writing-prd`). Every element must trace back to a user story or rule in it.

## The Process

1. **Constraints first.** Ask (one per message): budget (free tier only?), who will maintain it, hosting already available, data sensitivity (personal data? payments?), expected users in the first 3 months.
2. **Pick the simplest stack that fits.** Default for a small web product: one frontend framework the team knows, a managed backend (e.g. Supabase or Firebase) for database + auth + storage, static/serverless hosting. Add a separate server only when a requirement needs one. Offer at most 2 alternatives with trade-offs.
3. **Components diagram.** List components and what calls what (browser → API → database → external services). A short Mermaid diagram is fine.
4. **Data model.** Entities, fields with types, required/optional, relationships, and who owns each row. Write it as a table or SQL. Include `created_at`, `updated_at`, and an owner/user reference where rows belong to someone.
5. **Access rules.** For every table: who can read, create, update, delete. With Supabase/Postgres, express them as row-level security policies. Default deny.
6. **API contract.** For each operation the UI needs: method, path or function name, input, output, errors. Use the PRD's user-story IDs.
7. **Secrets & config.** List every key and env var, where it lives (server only vs. public), and how it is set per environment. Public keys are named as public; secret keys never reach the browser.
8. **LLM features (if any).** Model and provider, prompt location (versioned file, not inline strings), structured output schema, retrieval design for RAG (sources, chunking, citations), cost estimate per request, and fallback when the model fails.
9. **ADRs.** For each decision with real alternatives, write an ADR: Context, Decision, Alternatives considered, Consequences.

## ADR Template

```markdown
# NNNN — <decision>
Date · Status: Proposed | Accepted | Superseded by NNNN
## Context
## Decision
## Alternatives considered
## Consequences (good and bad)
```

## Review

Walk your human partner through the overview in short chunks. Highlight anything that costs money, stores personal data, or is hard to reverse. Get explicit approval.

## Hand-off

Approved → `aether:writing-plans`. If the repo has no rules file yet → `aether:harness-setup` first.

## Red Flags

| Thought | Reality |
|---------|---------|
| "Microservices will scale better" | You have zero users. Scale later. |
| "We'll add permissions later" | Data leaks happen in the gap. Default deny now. |
| "Put the API key in the frontend for now" | It will be scraped within days. Server-side only. |
| "The schema will evolve, skip it" | Write v1 anyway; migrations are how it evolves. |
