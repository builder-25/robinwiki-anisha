# Robin Wiki

The web frontend for Robin — a personal wikipedia built from everything you know.

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Environment

Copy `.env.example` to `.env.local` and configure:

```
NEXT_PUBLIC_ROBIN_API=http://localhost:3000
```

This tells the wiki where the Robin core API server is running. All `/api/*` requests are proxied to this URL via Next.js rewrites.

## Password Recovery

If you forget your password, navigate directly to `/recover` in your browser. This page is not linked from the login screen.

You will need your **server secret key** (the `BETTER_AUTH_SECRET` value from the core server's environment) to reset your password to the current `INITIAL_PASSWORD` value.
