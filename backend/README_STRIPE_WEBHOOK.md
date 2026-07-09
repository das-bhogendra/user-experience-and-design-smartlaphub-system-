# Stripe Webhook (SmartLapHub)

This file documents expected environment variables and routing.

## Required env vars
- `STRIPE_WEBHOOK_SECRET`
  - Set this to the webhook signing secret from Stripe Dashboard.

## Backend endpoint
- `POST /api/order/webhook/stripe`

## Notes
- The webhook handler MUST verify signature using the raw request body.
- Ensure Express is configured to use `express.raw({ type: 'application/json' })` for this endpoint.

