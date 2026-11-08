# Rive case-study assets

Case-study content: `src/data/rive.ts`.
Case-study interface and diagram reader: `src/components/RiveCaseStudy.tsx`.

- Seven diagrams originate from `ai_receptionist_frontend/diag/`.
- Full-resolution diagrams are WebP; gallery previews are small JPEGs.
- Seven walkthroughs have MP4 and WebM versions with JPEG posters.
- Five additional recordings cover AI conversations, knowledge management,
  the dashboard, appointment rescheduling/cancellation and human takeover.
- All walkthroughs use the frontend's seeded demo adapter, not real patients.

The live product is https://rivee.vercel.app/.

Technical descriptions were checked against the backend and frontend source.
Test counts are a source inventory, not a claim of load-testing or coverage.
Backend CI is implemented; automated API CD and the recurring outbox sweeper
scheduler are explicitly marked as remaining rollout work. Inbox updates use
polling; delivery receipts are webhook-driven. SSE and Chargily billing are
roadmap items rather than completed features.
