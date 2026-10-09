# Genjutsu AI Generator

Production motion-transfer service at https://genjutsuaigenerator.com.

Users upload one character image and choose a 10-second hip-hop or K-pop reference. Kling 2.6 Motion Control produces a 720p MP4. The service supports email verification and Google sign-in, Stripe credit packs and a monthly plan, an independent credit ledger, private media downloads, and read-only reporting in the Hotel administration panel.

## Development

Use Node.js 22 or newer:

```sh
npm ci
npm run build
npm run check
npm test
```

The build produces 140 HTML pages in seven languages. `npm run preview` previews static pages; live accounts, billing and generation require the Worker bindings.

## Production deployment

```sh
npm run build
npx wrangler deploy --profile oprom0004
```

`wrangler.jsonc` defines the production Worker, SQLite Durable Object, private R2 bucket, asset binding, domain routes and maintenance schedule. Production traffic is handled by this Worker, including HTML assets, rather than a standalone static Pages deployment.

Secrets must be configured in Cloudflare: the two administration tokens, KIE key, Resend key, Stripe restricted key, webhook signing secret, four price IDs, billing portal configuration, and Google client ID and secret. Never commit `.env`, `.dev.vars` or `.local` files.

One credit pays for one submitted video. Confirmed generation failures return the credit once; ambiguous provider submissions require reconciliation and are not automatically submitted again. Images and generated videos are private and retained for seven days. Monthly credits expire at the billing period end; one-time pack credits have no expiry.

See [production acceptance record](docs/PRODUCTION_2026_10_09.md) for checks, deployment versions, costs and remaining payment limitations.
