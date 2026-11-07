---
name: security-review
description: Use before the first public deploy, and whenever code touches login, user data, payments, file uploads, API keys or an LLM that reads untrusted input - to find the security mistakes AI-generated code commonly makes and fix them with evidence
---

# Security Review

## Overview

Phase **05 Verify**. AI-written code works in the demo and leaks in production: keys in the frontend, tables anyone can read, inputs nobody validates. This review checks the common failures systematically and records what was found, fixed, or accepted.

**Announce at start:** "I'm using the security-review skill to check for security problems."

**Save to:** `docs/aether/reviews/YYYY-MM-DD-security.md`

## The Checklist

Work through every section. For each item record: **OK** (with the evidence: file, line, command output), **FIXED** (what changed), or **RISK ACCEPTED** (only if your human partner explicitly accepts it).

### 1. Secrets
- Search the repo and full git history for keys, tokens, passwords (`git log -p | grep -iE "key|secret|token|password"`, or a scanner such as gitleaks if available).
- `.env*` files are in `.gitignore` and not committed. A `.env.example` lists names only.
- Secret keys are only used server-side. Anything shipped to the browser is public — check bundle output for keys.
- A leaked key must be **rotated**, not just deleted from the code.

### 2. Authentication & authorization
- Every non-public route and API checks the user is logged in.
- Every read/write checks the user is *allowed* to touch *that* record (not just "logged in"). Try accessing another user's record by changing an ID.
- Database row-level security is enabled with default deny (Supabase/Postgres).
- Admin actions are restricted to admins on the server, not only hidden in the UI.

### 3. Input handling
- All user input is validated on the server (type, length, allowed values).
- Database queries are parameterized — no string-built SQL.
- User content rendered as HTML is escaped or sanitized (XSS).
- File uploads: type and size limits, stored outside the web root or in object storage, never executed.

### 4. LLM-specific
- **Prompt injection:** untrusted text (web pages, emails, uploaded files, user messages) cannot change the system instructions or trigger tools on its own. Tools an LLM can call are least-privilege, and destructive ones require confirmation.
- The model's output is treated as untrusted input before it is rendered, executed, or stored.
- No secrets or unnecessary personal data in prompts or logs.
- Cost guard: rate limit per user, max tokens per request.

### 5. Dependencies
- Run the ecosystem's audit (`npm audit`, `pip-audit`, …). Fix high/critical or record why not.
- Check that every package the AI added really exists and is the intended one (typo-squatted and hallucinated package names are a real attack).

### 6. Personal data
- List what personal data is stored, why, and who can see it. Collect only what the PRD needs.
- Follow the data-protection law that applies to your users; flag it to your human partner if unsure.

### 7. Transport & headers
- HTTPS everywhere; cookies `Secure`, `HttpOnly`, `SameSite`.
- CORS allows only the app's own origins.

## Report Template

```markdown
# Security review — <date>
Scope: <commit / branch / features>
| # | Area | Item | Result | Evidence / change |
## Open risks (accepted by <name>)
## Follow-ups
```

## Hand-off

Fixes go through `aether:test-driven-development` (write a test that reproduces the hole first). Then `aether:requesting-code-review`.

## Red Flags

| Thought | Reality |
|---------|---------|
| "It's just a student project" | Real users' data is still real. |
| "Nobody will find this URL" | Scanners find everything. |
| "I deleted the key from the code" | It's in git history. Rotate it. |
| "The UI hides the admin button" | Hiding is not authorization. Check on the server. |
