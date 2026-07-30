# MouseLab

A data-driven way to compare mouse gear — run precision tests in the browser, capture raw pointer motion, and see exactly how a setup performs across velocity, acceleration, and consistency.

https://mouse-lab-nine.vercel.app

---

## Why this exists

Most "how good is a some gear" discussion online is anecdotal, mostly about relative feel rather than data. MouseLab lets you run controlled tests based on the two fundamental motions involved in moving your mouse: tracking and flicking. This is done directly in the browser, capturing the raw pointer samples as they happen, with real kinematic metrics against time that are visualized. Every session is saved, so you can go back and compare how different mouse / mousepad / skate combinations perform.

## What it does

- **Testing page** — run a tracking test (sustained, axis-isolated movement) and a flicking test (explosive, direction-agnostic movement), each capturing raw pointer samples in real time via the Pointer Events API.
- **Live plots** — see velocity and acceleration curves rendered as you go, computed client-side for instant feedback.
- **Submit a session** — pointer samples, along with your hardware settings (mouse, mousepad, skates, DPI, polling rate, sensitivity, resolution, refresh rate), are sent to the backend and persisted.
- **History page** — a paginated view of every session you've run, with summary stats (most-used gear, total sessions) and an expandable detail view per session showing recomputed metrics and plots.
- **Auth** — sign in via Clerk; every session is scoped to your account, and you can only ever view or delete your own data.

## Tech stack

| | |
|---|---|
| **Backend** | Java 25, Spring Boot, Spring Data JPA, Spring Security (OAuth2 Resource Server), PostgreSQL, Flyway, JUnit / MockMvc |
| **Frontend** | React, TypeScript, RTK Query, React Hook Form, Zod, Tailwind CSS, shadcn/ui, Framer Motion |
| **Auth** | Clerk (JWT-based, verified via JWKS) |
| **Infra** | Docker (multi-stage build), Railway (backend + Postgres), Vercel (frontend) |

```
Frontend (React/Vite) ──HTTPS──▶ Backend (Spring Boot) ──▶ PostgreSQL
       │                              │
       └── Clerk (auth) ◀─────────────┘ (JWT verification via JWKS)
```

## Running it locally

**Backend**
```bash
cd server
cp .env.example .env   # fill in your own Clerk issuer URI + local Postgres credentials
./gradlew bootRun
```

**Frontend**
```bash
cd client
cp .env.example .env.development
npm install
npm run dev
```

Both expect a local PostgreSQL instance — `docker compose up` from the repo root will spin one up alongside the backend if you'd rather not install Postgres directly.

## Testing

```bash
cd server
./gradlew test
```
