# Djerba Stays

Premium vacation-rental website for Djerba, Tunisia. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Firebase.

## Stack

- **Framework:** Next.js 14, TypeScript
- **Styling:** Tailwind CSS (custom brand design system — see `tailwind.config.ts`)
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Hosting:** Vercel
- **Icons:** Lucide

## Local setup

1. Install dependencies:
```bash
   npm install
```

2. Copy the environment example and fill in your Firebase project's config:
```bash
   cp .env.local.example .env.local
```
   Firebase config values are found in Firebase Console → Project settings → General → Your apps.

3. Run the dev server:
```bash
   npm run dev
```
   Open http://localhost:3000.

## Firebase setup

1. Create a Firebase project (or use an existing one).
2. Enable **Authentication** → Email/Password provider.
3. Enable **Firestore Database** (production mode).
4. Enable **Storage**.
5. Manually create your first admin user under Authentication → Users — there is no public sign-up flow by design.
6. Deploy security rules from this repo:
```bash
   firebase login
   firebase use --add   # select your Firebase project
   firebase deploy --only firestore:rules,storage:rules
```

## Project structure