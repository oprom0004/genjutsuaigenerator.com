# Genjutsu production acceptance — 2026-10-09

## Deployed service

Production: https://genjutsuaigenerator.com

- Worker `genjutsu-ai-generator`, custom root/www routes, static asset binding.
- Independent SQLite Durable Object `GenjutsuCommerce`, ledger `genjutsu-ledger-v1`.
- Private R2 bucket `genjutsu-ai-generator-private`; maintenance every ten minutes.
- Email accounts with verification, reset and HttpOnly sessions; Google OAuth with PKCE/state/nonce and verified email validation.
- One image plus one fixed ten-second motion reference; Kling 2.6 Motion Control, 720p. Hip-hop and K-pop are the two supported references.
- Stripe: one video $6.99, three $17.99, ten $49.99, monthly three credits $14.99. Monthly credits expire at the billing period end; pack credits do not expire.
- Signed payment events, idempotent grants/reservations, confirmed-failure refunds and ambiguous-submission reconciliation.
- Private outputs and uploads expire after seven days. Authenticated byte-range downloads support seeking; output redirects to unapproved hosts are rejected.
- Central Hotel admin now exposes actual users, purchases, subscriptions, credit batches, spends and video tasks through a read-only service binding and separate read credential.
- GA4 configured. Optional first-party events record source and bounded actions; DNT/GPC are respected and payment/generation totals come from server records.

## Live acceptance

1. Real email registration and verification through Resend's simulator address; account began at zero credits.
2. Real Stripe production Checkout sessions for single purchase and monthly plan were checked for currency, amount and application metadata. Both were expired unpaid; two production signed expiry callbacks reached the site. No charge and no subscription were created.
3. A narrowly limited one-credit acceptance grant funded the real service test. The temporary grant endpoint and flag were subsequently removed; unauthenticated endpoint check returns 404.
4. Three actual model tasks succeeded: human reference, anime reference and production upload-to-private-download task. Each consumed 110 provider credits ($0.55), total $1.65 within the authorized $2 budget. Direct provider samples were not visually reviewed; the production task was viewed and played in the site's account dashboard.
5. Production task `3b8aa78e-cc2c-4512-bca7-81f20ccc3ccf` was archived privately. Request replay did not spend again. Anonymous download returned 401; authenticated range request returned 206 with exactly 1,024 bytes. The account dashboard's Download link saved the video successfully in the browser.
6. Google callback was added to the existing client after explicit confirmation. Owner Google registration/login completed and returned to the site's real account dashboard.
7. `contact@genjutsuaigenerator.com` routes to the verified destination `oprom0004@gmail.com`. Old Porkbun MX/SPF records were replaced by Cloudflare routing records. Cloudflare logged the test as forwarded with SPF/DKIM passing; the test was visible in the owner's Gmail session. The visible Gmail account was `mehelpme@gmail.com`; this observation does not independently identify any downstream Gmail forwarding settings.
8. Public root, generator, pricing, all seven home languages, robots and sitemap return 200. Dashboard has noindex and is excluded from sitemap; anonymous internal administration returns 404.
9. Frontend no longer fabricates local credits, payment status or generation progress. JS/CSS content revisions prevent stale pre-production client code from persisting in the browser cache.

## Automated verification

Build: 140 pages, seven languages. Integrity check passed. All 22 tests passed, including signed callbacks, invoice idempotency/amount checks, monthly expiry, cancellation preserving current credits, unknown provider submission safety, refund once, media ownership, read-only admin isolation and private output redirect boundaries.

## Remaining financial limitations

Pricing update: the owner approved reducing only the single-video price to $6.99. A new Stripe USD 699-cent price replaced the Cloudflare single-video price binding. All seven pricing pages, structured-data offers and the live plan API were verified. A Checkout session created through the production site's actual account endpoint reported USD 6.99 and was expired unpaid. All 22 tests passed. Deployed Worker version: `21777654-d714-4e96-a507-5b6d1a7e46ed`.

- Real card payment/settlement and actual paid subscription renewal were not executed, as explicitly instructed by the owner. Signed paid callbacks and monthly invoice behavior were tested locally with isolated fixtures; this is not a real production settlement test.
- The existing Stripe account displays `Update your bank account`: its payout bank has an error and payout information must be updated by the owner. This is an account-level payout issue, not evidence that the Genjutsu Checkout integration fails. The restricted API key cannot read account capability status; no permissions were widened. No bank information was changed.
- Do not describe payout or real-paid end-to-end acceptance as complete until the owner resolves the bank task and authorizes a payment test.

Private test credentials, API keys, raw setup responses and model logs are stored only under ignored `.local/` files. UI proof images are local and excluded from Git.
