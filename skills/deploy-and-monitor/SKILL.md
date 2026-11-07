---
name: deploy-and-monitor
description: Use when putting a web app, tool or API online for the first time, shipping a new release, setting up a custom domain, environment variables, error tracking or analytics, or planning how to roll back a bad release
---

# Deploy & Monitor

## Overview

Phase **06 Ship**. Shipping is not "run the deploy command". It is: the right build, with the right config, at a URL users can trust, with a way to see when it breaks and a way to undo it.

**Announce at start:** "I'm using the deploy-and-monitor skill to ship this safely."

**Save to:** `docs/aether/ship/runbook.md` (created once, updated each release) and `CHANGELOG.md`.

## Preconditions (stop if any fails)

- `aether:verification-before-completion` passed on the commit you will deploy: tests green, build succeeds locally.
- For a first public deploy, or a release touching auth/data/payments: `aether:security-review` done.
- Your human partner has approved deploying. Never deploy to production on your own initiative.

## 1. Choose the host (first deploy only)

Prefer a managed platform with a free tier and preview deploys for small projects:
- static site / SPA → GitHub Pages, Netlify, Vercel, Cloudflare Pages;
- full-stack framework (Next.js, Nuxt, SvelteKit…) → the platform the framework documents first;
- backend / database → the managed service chosen in `aether:architecture-design`.

Record the choice and why in the runbook.

## 2. Configuration

- List every env var from the architecture doc. Set them in the host's dashboard/CLI per environment (preview vs. production). Never commit them.
- Public variables (sent to the browser) are named as such by the framework (e.g. `NEXT_PUBLIC_`, `VITE_`). Double-check no secret has a public prefix.
- Set the production URL in any auth provider's allowed redirect list.

## 3. Deploy in two steps

1. **Preview** — deploy the branch to a preview URL. Smoke-test the critical path from the PRD (log in, the main job, log out) on a phone and a desktop.
2. **Production** — promote or merge only after the preview passes. Tag the release (`git tag vX.Y.Z`) and add a CHANGELOG entry.

## 4. Domain & HTTPS

Custom domain: add the DNS records the host gives you, wait for the certificate, then verify `https://` loads and `http://` redirects. Record DNS settings in the runbook.

## 5. Monitoring (minimum set)

- **Uptime:** a free uptime check on the main URL, alerting by email.
- **Errors:** front-end and server error tracking (the host's logs at minimum; an error-tracking service if available). Make sure you can see one test error arrive.
- **Usage:** privacy-respecting analytics for the PRD's success metric only. Tell users if you collect analytics.
- **LLM features:** log request count and cost per day; set a spending cap with the provider.

## 6. Rollback

Before the first release, write down and test once how to return to the previous version (host's "redeploy previous", or revert + redeploy). A rollback you have never tried is a guess.

## Runbook Template

```markdown
# Runbook — <product>
Host · Production URL · Preview URL pattern · Repo
## Environments & env vars (names only)
## Deploy steps
## Rollback steps (tested on <date>)
## Monitoring: where to look, who gets alerts
## Domain / DNS
## Release log → see CHANGELOG.md
```

## Hand-off

After a successful release: `aether:finishing-a-development-branch` to close out the branch. Tell your human partner the URL, what was released, and how to roll back.

## Red Flags

| Thought | Reality |
|---------|---------|
| "Deploy straight to production, it's small" | Preview first. It takes two minutes. |
| "I'll put the env vars in the repo for now" | That is a leak, not a shortcut. |
| "We'll notice if it breaks" | You'll notice when a user tells you. Set an alert. |
| "Rollback is just git revert" | Then try it once before you need it. |
