# Vitality Score

Standalone Next.js funnel for capturing a pre-signup vitality score and email.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Configure the backend base URL:

```bash
cp .env.example .env
```

3. Run the app:

```bash
npm run dev
```

## Environment

`NEXT_PUBLIC_RAYHAWK_API_URL`

- Example: `http://localhost:8080`
- The app will automatically append `/v1` if you provide only the host root.

The funnel posts completed vitality assessments to `POST /v1/vitality-score-leads`.

## Email delivery

Lead emails for `vitality-score` are sent by the shared Rayhawk backend mailer.

Configure these in `rayhawk-backend/.env`:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_REPLY_TO` optional
- `RESEND_API_BASE_URL` optional, defaults to `https://api.resend.com`
- `VITALITY_SCORE_NOTIFY_TO` optional internal notification inbox
- `TSHOTS_WEBSITE_URL` optional, defaults to `https://t-shots.com`
- `TSHOTS_APP_STORE_URL` optional App Store link for the CTA email

Rayhawk will prefer Resend when those env vars are present. Gmail remains as a fallback for older flows if you still keep `GMAIL_USER` and `GMAIL_APP_PASSWORD`.

When configured, each completed vitality-score submission will:

1. email the user their saved score plus a primary CTA to `${TSHOTS_WEBSITE_URL}/get-app`
2. include a secondary web fallback to `TSHOTS_WEBSITE_URL`
3. optionally include a direct App Store CTA when `TSHOTS_APP_STORE_URL` is set
4. optionally send an internal notification copy
