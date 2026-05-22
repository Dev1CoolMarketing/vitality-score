# Resend Email Setup

This document explains how to hook up Resend for the `vitality-score` funnel.

Important: the `vitality-score` app does **not** send email directly.
Email is sent by the shared `rayhawk-backend` mailer after a vitality score lead is submitted.

## Current flow

1. A user completes the `vitality-score` quiz.
2. The Next.js app posts the result to Rayhawk at `POST /v1/vitality-score-leads`.
3. Rayhawk saves:
   - the email address
   - the total vitality score
   - the completed metric count
   - the per-metric slider values in `scores`
4. Rayhawk sends the follow-up email through Resend if Resend is configured.

## Files involved

- `vitality-score/.env`
- `vitality-score/.env.example`
- `rayhawk-backend/.env`
- `rayhawk-backend/.env.example`
- `rayhawk-backend/src/modules/mailer/mailer.service.ts`
- `rayhawk-backend/src/modules/vitality-score-leads/vitality-score-leads.service.ts`

## 1. Set the frontend API URL

In `vitality-score/.env`:

```env
NEXT_PUBLIC_RAYHAWK_API_URL=http://localhost:8080
```

Notes:

- You can use either the root host or the `/v1` path.
- The app will append `/v1` automatically if needed.

Examples:

```env
NEXT_PUBLIC_RAYHAWK_API_URL=http://localhost:8080
```

or

```env
NEXT_PUBLIC_RAYHAWK_API_URL=https://api.yourdomain.com/v1
```

## 2. Configure Resend in Rayhawk

In `rayhawk-backend/.env`, add:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_REPLY_TO=
RESEND_API_BASE_URL=https://api.resend.com
VITALITY_SCORE_NOTIFY_TO=
TSHOTS_WEBSITE_URL=https://t-shots.com
TSHOTS_APP_STORE_URL=
```

### What each variable does

- `RESEND_API_KEY`
  - Your Resend API key.

- `RESEND_FROM_EMAIL`
  - The sender address Resend will use.
  - Example: `Vitality Score <hello@yourdomain.com>` or `hello@yourdomain.com`

- `RESEND_REPLY_TO`
  - Optional reply-to inbox.
  - Example: `support@yourdomain.com`

- `RESEND_API_BASE_URL`
  - Leave as `https://api.resend.com` unless you have a special proxy setup.

- `VITALITY_SCORE_NOTIFY_TO`
  - Optional internal copy for lead notifications.
  - Example: `team@yourdomain.com`

- `TSHOTS_WEBSITE_URL`
  - Base T-Shots website URL used in the vitality-score email.
  - Default expected value: `https://t-shots.com`
  - The primary email CTA now lands on `${TSHOTS_WEBSITE_URL}/get-app`

- `TSHOTS_APP_STORE_URL`
  - Optional direct App Store CTA used in the vitality-score email.
  - Put the real iOS App Store URL here when ready.

## 3. Resend account setup

Before using the env vars above:

1. Create a Resend account.
2. Add and verify the sending domain you want to use.
3. Create an API key with permission to send email.
4. Use a verified sender in `RESEND_FROM_EMAIL`.

If the domain or sender is not verified in Resend, sends will fail.

## 4. Provider behavior

Rayhawk currently works like this:

- If `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are present, Rayhawk uses Resend.
- If Resend is not configured, Rayhawk falls back to the older Gmail/Nodemailer config.
- If neither provider is configured, the vitality score still saves, but the email send is skipped or fails depending on the call path.

## 5. What the user email contains

When configured, the vitality-score email includes:

- a thank-you message
- the user’s total vitality score
- the score band
- the full metric breakdown
- a primary CTA button to the T-Shots `/get-app` lander
- a secondary fallback button to the T-Shots website
- an optional CTA button to the App Store

## 6. Restart the services

After changing env vars, restart:

```bash
cd rayhawk-backend
npm run dev
```

and

```bash
cd vitality-score
npm run dev
```

## 7. Test checklist

1. Start `rayhawk-backend`
2. Start `vitality-score`
3. Complete the quiz
4. Submit a real email address
5. Confirm:
   - the lead is created in `core.vitality_score_leads`
   - `total_score` is populated
   - `scores` contains all slider values
   - the user receives the email
   - the CTA links go to the correct website/App Store targets

## 8. Troubleshooting

### No email arrives

Check:

- `RESEND_API_KEY` is valid
- `RESEND_FROM_EMAIL` is on a verified domain
- the backend was restarted after env changes
- the lead saved successfully in the database

### Lead saves but no email sends

Check Rayhawk logs for:

- Resend auth errors
- invalid sender errors
- domain verification errors

### Wrong links in the email

Check:

- `TSHOTS_WEBSITE_URL`
- `TSHOTS_APP_STORE_URL`
- the T-Shots web app has the `/get-app` route available

## 9. Recommended production values

Example:

```env
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=Vitality Score <hello@t-shots.com>
RESEND_REPLY_TO=support@t-shots.com
RESEND_API_BASE_URL=https://api.resend.com
VITALITY_SCORE_NOTIFY_TO=team@t-shots.com
TSHOTS_WEBSITE_URL=https://t-shots.com
TSHOTS_APP_STORE_URL=https://apps.apple.com/us/app/your-app-id
```

## 10. Notes

- The actual per-question choices are already stored as numeric values in the `scores` JSON field on `vitality_score_leads`.
- The current email is generated on the Rayhawk side, not in the Next.js app.
- If you later want branded templates managed outside code, the clean next step is to move the HTML into a dedicated template layer.
