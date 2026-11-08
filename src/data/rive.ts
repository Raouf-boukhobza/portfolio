export const RIVE_LINKS = {
  live: 'https://rivee.vercel.app/',
}

export const RIVE_METRICS = [
  { value: '207', label: 'backend tests', detail: 'Jest + Supertest' },
  { value: '30', label: 'frontend tests', detail: 'Vitest + Testing Library' },
  { value: '7', label: 'flow diagrams', detail: 'failure-mode walkthroughs' },
  { value: '5', label: 'LangGraph tools', detail: 'grounded agent loop' },
  { value: '3', label: 'BullMQ queues', detail: 'split by failure domain' },
  { value: '4', label: 'idempotency layers', detail: 'no duplicate AI calls' },
]

export const RIVE_CAPABILITIES = [
  {
    id: 'agent',
    eyebrow: 'Patient-facing AI',
    title: 'WhatsApp AI Receptionist',
    body: 'A LangGraph agent searches the tenant knowledge base before it answers a factual question, then books, reschedules or cancels with structured tools. Prices, hours and doctors come from the database — never from the model’s imagination.',
  },
  {
    id: 'inbox',
    eyebrow: 'Human-in-the-loop',
    title: 'Inbox & Human Takeover',
    body: 'Escalations land in a needs-you queue. Staff can reply, pause the AI and hand the thread back. A version check discards a stale AI draft if a human took over mid-generation, so the bot never talks over the clinic.',
  },
  {
    id: 'booking',
    eyebrow: 'Scheduling integrity',
    title: 'Appointment Management',
    body: 'Working hours, doctor-service links, duration and conflicts are validated in the service layer, then enforced again by a Postgres exclusion constraint. Concurrent requests fall back to the next eligible doctor or alternative slots.',
  },
  {
    id: 'knowledge',
    eyebrow: 'RAG with a gate',
    title: 'Knowledge Base & RAG',
    body: 'Services, doctors, weekly hours and FAQs are chunked, embedded with Gemini and stored in pgvector. A retrieval test must pass at cosine distance ≤ 0.5 before the workspace can become active.',
  },
  {
    id: 'outbox',
    eyebrow: 'Delivery reliability',
    title: 'Reliable Message Delivery',
    body: 'The expensive LLM call and the fallible Redis enqueue are separated by a durable commit. Retries skip the model and only re-dispatch the stored reply. Recovery logic for stranded messages is implemented; enabling the recurring sweeper is a rollout task.',
  },
  {
    id: 'reminders',
    eyebrow: 'Scheduled care',
    title: 'Appointment Reminders',
    body: 'Delayed BullMQ jobs send approved WhatsApp templates outside the 24-hour service window. Rescheduling rotates the job IDs; cancellation removes them. A stale job that still fires checks the booking before sending.',
  },
  {
    id: 'tenancy',
    eyebrow: 'SaaS foundation',
    title: 'Multi-Tenant Architecture',
    body: 'Postgres row-level security scopes every business table. Tenant resolution is cached in Redis for the webhook hot path. WhatsApp credentials are encrypted with AES-256-GCM and hidden behind a connection state machine.',
  },
  {
    id: 'frontend',
    eyebrow: 'Product surface',
    title: 'Clinic Dashboard',
    body: 'React 19, TanStack Query and Radix primitives power a responsive inbox, schedule, answer bank and settings workspace — plus a full in-browser demo adapter so reviewers can use the product without a backend.',
  },
]

export interface RiveVideo {
  id: string
  group: 'conversations' | 'schedule' | 'knowledge'
  groupLabel: string
  title: string
  blurb: string
  tags: string[]
  duration: string
  mp4: string
  webm: string
  poster: string
}

const videoBase = '/projects/rive/videos'

export const RIVE_VIDEOS: RiveVideo[] = [
  {
    id: 'ai-conversation',
    group: 'conversations',
    groupLabel: 'Conversations',
    title: 'AI conversation → escalation',
    blurb:
      'A patient asks about pricing, gets a grounded answer, books Saturday 09:30, then the AI hands a two-patient request to the clinic team.',
    tags: ['LangGraph', 'pgvector', 'grounded tools', 'handover'],
    duration: '0:15',
    mp4: `${videoBase}/rive-ai-conversation.mp4`,
    webm: `${videoBase}/rive-ai-conversation.webm`,
    poster: '/projects/rive/screens/rive-ai-conversation.jpg',
  },
  {
    id: 'human-takeover',
    group: 'conversations',
    groupLabel: 'Conversations',
    title: 'Human takeover → AI resume',
    blurb:
      'Staff reply from the inbox; Rive pauses, the outbox delivers the message, and the conversation returns to AI through a version-checked transition.',
    tags: ['optimistic locking', 'outbox', 'delivery', 'auto-resume'],
    duration: '0:26',
    mp4: `${videoBase}/rive-human-takeover.mp4`,
    webm: `${videoBase}/rive-human-takeover.webm`,
    poster: '/projects/rive/screens/rive-human-takeover.jpg',
  },
  {
    id: 'inbox-reply',
    group: 'conversations',
    groupLabel: 'Conversations',
    title: 'Owner reply & delivery states',
    blurb:
      'An owner reply moves through queued → sent → delivered while the thread stays readable and the AI remains paused.',
    tags: ['delivery receipts', 'optimistic UI', 'polling'],
    duration: '0:21',
    mp4: `${videoBase}/rive-inbox.mp4`,
    webm: `${videoBase}/rive-inbox.webm`,
    poster: '/projects/rive/screens/rive-inbox.jpg',
  },
  {
    id: 'appointment-lifecycle',
    group: 'schedule',
    groupLabel: 'Schedule',
    title: 'Reschedule → cancel',
    blurb:
      'Move a 09:00 appointment to 12:00, then cancel it. Availability, reminder jobs and slot release follow the appointment.',
    tags: ['exclusion constraint', 'reminder rotation', 'slot release'],
    duration: '0:22',
    mp4: `${videoBase}/rive-appointment-lifecycle.mp4`,
    webm: `${videoBase}/rive-appointment-lifecycle.webm`,
    poster: '/projects/rive/screens/rive-appointment-lifecycle.jpg',
  },
  {
    id: 'staff-booking',
    group: 'schedule',
    groupLabel: 'Schedule',
    title: 'Staff booking',
    blurb:
      'Create a booking from the clinic side. The server applies the same working-hours and conflict rules as the AI agent.',
    tags: ['server validation', 'doctor matching', 'schedule'],
    duration: '0:26',
    mp4: `${videoBase}/rive-appointments.mp4`,
    webm: `${videoBase}/rive-appointments.webm`,
    poster: '/projects/rive/screens/rive-appointments.jpg',
  },
  {
    id: 'dashboard',
    group: 'schedule',
    groupLabel: 'Schedule',
    title: 'Daily command centre',
    blurb:
      'The day’s stats, live schedule and needs-you queue. Open a handover conversation directly from the dashboard.',
    tags: ['operations', 'attention queue', 'near-real-time'],
    duration: '0:10',
    mp4: `${videoBase}/rive-dashboard.mp4`,
    webm: `${videoBase}/rive-dashboard.webm`,
    poster: '/projects/rive/screens/rive-dashboard.jpg',
  },
  {
    id: 'knowledge',
    group: 'knowledge',
    groupLabel: 'Knowledge',
    title: 'Answer bank & RAG rebuild',
    blurb:
      'Edit services, doctors and answers, then rebuild the tenant vector index. The workspace stays in setup until retrieval passes.',
    tags: ['pgvector', 'Gemini embeddings', 'retrieval test', 'activation'],
    duration: '0:14',
    mp4: `${videoBase}/rive-knowledge.mp4`,
    webm: `${videoBase}/rive-knowledge.webm`,
    poster: '/projects/rive/screens/rive-knowledge.jpg',
  },
]

export interface RiveDiagram {
  id: string
  eyebrow: string
  title: string
  blurb: string
  proof: string
  image: string
  thumb: string
}

const diagramBase = '/projects/rive/diagrams'

export const RIVE_DIAGRAMS: RiveDiagram[] = [
  {
    id: 'onboarding',
    eyebrow: 'Flow 01 · Onboarding',
    title: 'Auth, activation & WhatsApp onboarding',
    blurb:
      'Signup and JWT rotation, Meta Embedded Signup code exchange, token validation, WABA subscription, registration, encrypted credential storage and the activation checklist.',
    proof: 'Production Meta onboarding, encrypted credentials and explicit readiness states.',
    image: `${diagramBase}/01-auth-and-whatsapp-onboarding.webp`,
    thumb: `${diagramBase}/01-auth-and-whatsapp-onboarding-thumb.jpg`,
  },
  {
    id: 'inbound',
    eyebrow: 'Flow 02 · Inbound',
    title: 'Webhook → AI conversation processing',
    blurb:
      'HMAC-verified webhook, persist-first ingest, Redis tenant resolution, duplicate guards, LangGraph execution and the outbox commit.',
    proof: 'Durable ingress, no LLM inside a database transaction and a stale-draft discard path.',
    image: `${diagramBase}/02-inbound-webhook-and-ai-processing.webp`,
    thumb: `${diagramBase}/02-inbound-webhook-and-ai-processing-thumb.jpg`,
  },
  {
    id: 'rag',
    eyebrow: 'Flow 03 · Knowledge',
    title: 'Knowledge-base ingestion, verification & RAG',
    blurb:
      'Chunk services, FAQs and doctor hours; embed with Gemini; replace the tenant’s vectors; verify retrieval; then run tenant-scoped search inside the agent.',
    proof: 'A RAG pipeline with a go-live quality gate at cosine distance ≤ 0.5.',
    image: `${diagramBase}/03-knowledge-base-rag.webp`,
    thumb: `${diagramBase}/03-knowledge-base-rag-thumb.jpg`,
  },
  {
    id: 'booking',
    eyebrow: 'Flow 04 · Booking',
    title: 'Booking, rescheduling & cancellation',
    blurb:
      'Working-hours validation, doctor matching, conflict checks, alternative slots, the Postgres exclusion constraint and reminder job rotation.',
    proof: 'Concurrency-safe scheduling and a database-enforced no-double-booking guarantee.',
    image: `${diagramBase}/04-booking-lifecycle.webp`,
    thumb: `${diagramBase}/04-booking-lifecycle-thumb.jpg`,
  },
  {
    id: 'takeover',
    eyebrow: 'Flow 05 · Human loop',
    title: 'Human takeover & guarded AI resumption',
    blurb:
      'Escalation, the holding reply, owner control, optimistic version checks, AI reply suppression and the auto-resume path.',
    proof: 'The AI can never talk over staff or resurrect a draft written before a takeover.',
    image: `${diagramBase}/05-human-takeover-and-resumption.webp`,
    thumb: `${diagramBase}/05-human-takeover-and-resumption-thumb.jpg`,
  },
  {
    id: 'outbound',
    eyebrow: 'Flow 06 · Outbound',
    title: 'Delivery, retries & delivery receipts',
    blurb:
      'Atomic claim, credential decrypt, Meta Cloud API send, wamid persistence, early-receipt cache, retry taxonomy and the dead state.',
    proof: 'At-least-once delivery with explicit provider failure handling and race recovery.',
    image: `${diagramBase}/06-outbound-delivery-and-receipts.webp`,
    thumb: `${diagramBase}/06-outbound-delivery-and-receipts-thumb.jpg`,
  },
  {
    id: 'reminders',
    eyebrow: 'Flow 07 · Reminders',
    title: 'Scheduled reminders & stale-job protection',
    blurb:
      'Delayed 24-hour and 1-hour jobs, approved template sends outside the 24-hour window, reschedule/cancel rotation and stale-job checks.',
    proof: 'Reminder correctness when bookings change after a job has already been queued.',
    image: `${diagramBase}/07-reminders-and-stale-jobs.webp`,
    thumb: `${diagramBase}/07-reminders-and-stale-jobs-thumb.jpg`,
  },
]

export interface RivePillar {
  id: string
  label: string
  title: string
  body: string
  bullets: string[]
  snippet: string
}

export const RIVE_PILLARS: RivePillar[] = [
  {
    id: 'rls',
    label: 'Data isolation',
    title: 'PostgreSQL Row-Level Security',
    body:
      'Every application query runs inside a short transaction that sets the tenant with a bound parameter. RLS policies on every business table make cross-tenant reads fail even if a WHERE clause is forgotten. The one cross-tenant maintenance query is scoped to IDs only.',
    bullets: [
      'set_config() with a bound parameter — never string interpolation',
      'Short transactions: LLM and HTTP calls stay outside',
      'RLS on bookings, conversations, messages, knowledge base and WhatsApp accounts',
    ],
    snippet: "await tx.$executeRaw`SELECT set_config('app.current_tenant', ${tenantId}, true)`",
  },
  {
    id: 'outbox',
    label: 'Reliability',
    title: 'Transactional Outbox & Idempotency',
    body:
      'The outbox pattern separates the expensive, non-idempotent LLM call from the fallible Redis enqueue. On retry, a unique reply guard lets the worker skip the model and only re-enqueue the send. Postgres remains the source of truth; Redis carries pointers, never message bodies.',
    bullets: [
      'Four idempotency layers: jobId, UNIQUE(tenant_id, wamid), UNIQUE(reply_to_message_id), status claim',
      'Inbound and outbound queues split by cost and failure domain',
      'Stale sending rows reclaimed after a 5-minute lease; 2-minute stranded collection',
    ],
    snippet: 'UNIQUE (reply_to_message_id) -- at most one AI reply per inbound message',
  },
  {
    id: 'redis',
    label: 'Caching',
    title: 'Redis Caching',
    body:
      'The webhook hot path resolves phone_number_id → tenant_id from a 24-hour Redis cache, then falls back to Postgres. Delivery receipts that arrive before the wamid is committed are cached for 60 seconds and replayed by the outbound worker, closing a real race in the Meta protocol.',
    bullets: [
      'Tenant cache: phone_number_id → tenantId, EX 86400',
      'Early receipt cache: wamid → status, EX 60',
      'BullMQ jobs carry IDs only; Postgres owns the content',
    ],
    snippet: "redis.set(`tenant:phone_number_id:${id}`, tenantId, 'EX', 86400)",
  },
  {
    id: 'langgraph',
    label: 'AI system',
    title: 'LangGraph Agent & Tools',
    body:
      'The graph is an agent ⇄ tools loop with Gemini Flash at temperature 0. Search is mandatory before any factual answer; booking tools return structured results (confirmed, unavailable + alternatives, not found) and the prompt forbids escalation on them. Tools open their own short RLS transactions.',
    bullets: [
      'search_knowledge · create_booking · update_booking · cancel_booking · escalate_to_human',
      'Last 20 messages of history; tenant context passed through configurable',
      'pgvector cosine search with a 0.5 distance threshold',
    ],
    snippet: 'START → agent ⇄ tools → agent → reply',
  },
  {
    id: 'booking',
    label: 'Scheduling',
    title: 'Booking Concurrency & Constraints',
    body:
      'The service checks working hours, doctor-service links and conflicts, tries alternative doctors, and offers same-day and next-day slots. A Postgres exclusion constraint on the doctor and time range makes overlapping confirmed bookings physically impossible, even if two requests race past the in-memory check.',
    bullets: [
      'btree_gist exclusion constraint; cancelled slots are excluded',
      'P2002 / 23P01 handled by trying the next eligible doctor',
      'Reminder job IDs stored on the booking and rotated on reschedule',
    ],
    snippet: 'EXCLUDE USING gist (doctor_id WITH =, tstzrange(start_time, end_time) WITH &&)',
  },
  {
    id: 'takeover',
    label: 'Human-in-the-loop',
    title: 'Human Takeover State Machine',
    body:
      'Conversations carry status and an optimistic version. The inbound worker re-checks both after the LLM returns; a staff takeover discards the draft instead of sending it. Outbound suppresses AI replies while a human owns the thread, and owner replies auto-resume the AI only when the version still matches.',
    bullets: [
      'ai_active · needs_human · human_active',
      'Pre-LLM skip plus post-LLM CAS discard',
      'Owner reply ordering guard prevents out-of-order sends',
    ],
    snippet: "WHERE id = $1 AND status = 'human_active' AND version = $2",
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    title: 'WhatsApp Security & Error Handling',
    body:
      'Webhooks are verified against the raw body with HMAC-SHA256 and a timing-safe compare. Access tokens are AES-256-GCM encrypted at rest and decrypted only inside the outbound worker. The client classifies retryable vs permanent errors, handles the 24-hour window with approved templates, and revokes tokens on 190/401.',
    bullets: [
      '10-second HTTP timeout to Meta',
      'Retry 429/5xx/rate limits; do not retry 190, 131026 or template errors',
      'Template messages for reminders outside the 24-hour window',
    ],
    snippet: 'HMAC-SHA256(rawBody, APP_SECRET) === X-Hub-Signature-256',
  },
  {
    id: 'realtime',
    label: 'Delivery & UX',
    title: 'Delivery Receipts & Inbox Updates',
    body:
      'Meta status webhooks move messages through sent → delivered → read or failed, with monotonic transitions and an early-receipt cache for protocol races. The React inbox refreshes conversations and the schedule on 12–15s intervals, uses optimistic UI for sends, and shows honest delivery ticks. SSE is the next transport upgrade.',
    bullets: [
      'Webhook-driven delivery state machine',
      'TanStack Query polling: inbox 12–15s, appointments 30s',
      'Optimistic owner reply plus delivery receipts',
    ],
    snippet: 'pending_dispatch → sending → sent → delivered → read',
  },
]

export const RIVE_FAILURE_MODES = [
  {
    failure: 'Redis is down after the AI reply is generated',
    guard: 'The reply is already committed as pending_dispatch; retries skip the LLM. The recovery service can re-enqueue stranded sends; its recurring scheduler still needs enabling.',
  },
  {
    failure: 'A worker dies between claim and Meta send',
    guard: 'A 5-minute sending lease expires, the row returns to dispatch_failed, and attempt limits move it to dead instead of retrying forever.',
  },
  {
    failure: 'Meta re-delivers the same webhook',
    guard: 'jobId + UNIQUE(tenant_id, wa_message_id) make the second delivery a no-op.',
  },
  {
    failure: 'A staff member takes over during an LLM run',
    guard: 'The post-LLM version/status check discards the draft; outbound suppression prevents AI sends in human_active.',
  },
  {
    failure: 'A delivery receipt arrives before the wamid is committed',
    guard: 'The receipt is cached for 60 seconds under early_receipt:wamid and replayed by the outbound worker.',
  },
  {
    failure: 'A booking is rescheduled after its reminder was queued',
    guard: 'The old job is removed, new 24h/1h jobs are created, and a stale job checks the stored job IDs before sending.',
  },
]

export const RIVE_FRONTEND_STACK = [
  'React 19',
  'Vite 8',
  'TypeScript',
  'Tailwind CSS v4',
  'TanStack Query 5',
  'React Hook Form',
  'Zod',
  'Radix UI',
  'React Router 7',
  'Vitest',
  'Testing Library',
]

export const RIVE_BACKEND_STACK = [
  'NestJS 11',
  'TypeScript',
  'PostgreSQL 16',
  'pgvector',
  'Prisma 7',
  'Redis 7',
  'BullMQ',
  'LangGraph',
  'LangChain',
  'Gemini Flash',
  'WhatsApp Cloud API',
  'JWT',
  'Jest',
  'Supertest',
  'Docker Compose',
  'GitHub Actions',
]
