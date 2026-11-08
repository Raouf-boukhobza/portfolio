import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDialogFocus } from './use-dialog-focus'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  GitBranch,
  Layers,
  Maximize2,
  MessageSquare,
  Minus,
  Move,
  Network,
  Plus,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  ZoomIn,
} from 'lucide-react'
import {
  RIVE_BACKEND_STACK,
  RIVE_DIAGRAMS,
  RIVE_FRONTEND_STACK,
  RIVE_LINKS,
  RIVE_METRICS,
  RIVE_PILLARS,
  type RiveDiagram,
} from '../data/rive'

const SECTIONS = [
  { id: 'rive-overview', label: 'Overview' },
  { id: 'rive-architecture', label: 'Architecture' },
  { id: 'rive-engineering', label: 'Engineering' },
]

function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-400">
        <span className="font-mono text-emerald-600">{index}</span>
        <span className="h-px w-8 bg-zinc-300" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-black tracking-[-0.035em] text-zinc-950 sm:text-[34px] sm:leading-[1.05]">
        {title}
      </h2>
      {intro ? <p className="text-[15px] leading-7 text-zinc-500">{intro}</p> : null}
    </div>
  )
}

function MetricCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-4 backdrop-blur-sm">
      <p className="font-mono text-[26px] font-black leading-none tracking-[-0.05em] text-zinc-950">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-700">{label}</p>
      <p className="mt-1 text-[10px] text-zinc-400">{detail}</p>
    </div>
  )
}

function Pill({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'mint' | 'amber' }) {
  const classes =
    tone === 'mint'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : tone === 'amber'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : 'border-zinc-200 bg-white text-zinc-600'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none ${classes}`}
    >
      {children}
    </span>
  )
}

function DiagramReader({
  diagrams,
  index,
  onIndexChange,
  onClose,
}: {
  diagrams: RiveDiagram[]
  index: number
  onIndexChange: (next: number) => void
  onClose: () => void
}) {
  const diagram = diagrams[index]
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialogFocus(dialogRef)
  const scrollRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const dragRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [dragging, setDragging] = useState(false)

  const next = () => onIndexChange((index + 1) % diagrams.length)
  const prev = () => onIndexChange((index - 1 + diagrams.length) % diagrams.length)

  useEffect(() => {
    setZoom(1)
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [diagram.id])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === '+' || event.key === '=') setZoom((value) => Math.min(6, value + 0.25))
      if (event.key === '-') setZoom((value) => Math.max(0.5, value - 0.25))
      if (event.key === '0') setZoom(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    const scroller: HTMLDivElement = element

    function onWheel(event: WheelEvent) {
      if (!(event.ctrlKey || event.metaKey)) return
      event.preventDefault()
      const rect = scroller.getBoundingClientRect()
      const pointerX = event.clientX - rect.left + scroller.scrollLeft
      const pointerY = event.clientY - rect.top + scroller.scrollTop
      setZoom((current) => {
        const nextZoom = Math.min(6, Math.max(0.5, current * (event.deltaY > 0 ? 0.9 : 1.1)))
        const ratio = nextZoom / current
        requestAnimationFrame(() => {
          scroller.scrollLeft = pointerX * ratio - (event.clientX - rect.left)
          scroller.scrollTop = pointerY * ratio - (event.clientY - rect.top)
        })
        return nextZoom
      })
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })
    return () => scroller.removeEventListener('wheel', onWheel)
  }, [diagram.id])

  function fitWidth() {
    setZoom(1)
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }

  function actualSize() {
    const element = scrollRef.current
    const image = imageRef.current
    if (!element || !image) return
    setZoom(Math.max(1, image.naturalWidth / element.clientWidth))
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    const element = scrollRef.current
    if (!element) return
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: element.scrollLeft,
      top: element.scrollTop,
    }
    element.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollRef.current
    const drag = dragRef.current
    if (!element || !drag) return
    element.scrollLeft = drag.left - (event.clientX - drag.x)
    element.scrollTop = drag.top - (event.clientY - drag.y)
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollRef.current
    dragRef.current = null
    setDragging(false)
    if (element?.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      data-rive-dialog
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex flex-col bg-[#0b0d10] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${diagram.title} — diagram reader`}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#111418]/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Close diagram reader"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              {diagram.eyebrow} · {index + 1} / {diagrams.length}
            </p>
            <h3 className="truncate text-sm font-bold text-white sm:text-base">{diagram.title}</h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))}
              className="flex size-8 items-center justify-center text-zinc-300 transition-colors hover:text-white"
              aria-label="Zoom out"
            >
              <Minus size={14} />
            </button>
            <span className="w-12 text-center font-mono text-[10px] text-zinc-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((value) => Math.min(6, value + 0.25))}
              className="flex size-8 items-center justify-center text-zinc-300 transition-colors hover:text-white"
              aria-label="Zoom in"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={fitWidth}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            <Move size={12} />
            Fit width
          </button>
          <button
            type="button"
            onClick={actualSize}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            <ScanSearch size={12} />
            1:1
          </button>
          <a
            href={diagram.image}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            <ExternalLink size={12} />
            Open image
          </a>

          <div className="ml-1 flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              className="flex size-8 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:text-white"
              aria-label="Previous diagram"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex size-8 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:text-white"
              aria-label="Next diagram"
            >
              <ChevronRight size={15} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 flex size-8 items-center justify-center rounded-full bg-white text-zinc-950 transition-colors hover:bg-emerald-300"
              aria-label="Close diagram reader"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/5 bg-[#0f1216] px-4 py-3 sm:px-6">
          <p className="max-w-4xl text-[11px] leading-5 text-zinc-400">{diagram.blurb}</p>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
            <CheckCircle2 size={12} />
            {diagram.proof}
          </span>
        </div>

        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => setZoom((value) => (value === 1 ? 2 : 1))}
          className={`relative min-h-0 flex-1 overflow-auto bg-[#0b0d10] ${
            dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ touchAction: 'pan-x pan-y' }}
        >
          <div style={{ width: `${zoom * 100}%` }} className="min-w-full">
            <img
              ref={imageRef}
              src={diagram.image}
              alt={diagram.title}
              draggable={false}
              className="block h-auto w-full max-w-none select-none bg-white"
            />
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#111418]/95 px-4 py-2.5 text-[10px] text-zinc-500 sm:px-6">
          <span className="inline-flex items-center gap-1.5">
            <Move size={11} />
            Drag to pan · Ctrl/⌘ + scroll to zoom · double-click the image to toggle
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <ZoomIn size={11} /> {Math.round(zoom * 100)}%
            </span>
            <span className="inline-flex items-center gap-1">
              <ChevronLeft size={11} /> <ChevronRight size={11} /> switch with arrow keys
            </span>
          </span>
        </footer>
      </div>
    </motion.div>
  )
}

export function RiveCaseStudy({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialogFocus(dialogRef)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)
  const [diagramIndex, setDiagramIndex] = useState<number | null>(null)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && diagramIndex === null) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [diagramIndex, onClose])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { root, rootMargin: '-16% 0px -70% 0px', threshold: 0 },
    )
    SECTIONS.forEach((section) => {
      const element = root.querySelector(`#${section.id}`)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  function scrollToSection(id: string) {
    const element = scrollRef.current?.querySelector(`#${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-stretch justify-center bg-zinc-950/55 p-0 backdrop-blur-md sm:p-3 lg:p-5"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        data-rive-dialog
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.985 }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="relative flex h-full w-full max-w-[1480px] flex-col overflow-hidden border border-white/20 bg-[#fafaf9] shadow-2xl sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Rive case study"
      >
        <header className="z-30 shrink-0 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-950 hover:text-zinc-950"
                aria-label="Close case study"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                  <Sparkles size={14} className="text-emerald-300" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-black tracking-tight text-zinc-950">
                    Rive · AI receptionist case study
                  </p>
                  <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                    Solo build · 2026 · multi-tenant SaaS
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <a
                href={RIVE_LINKS.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-8 items-center gap-1.5 rounded-full bg-zinc-950 px-3.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-600 sm:inline-flex"
              >
                Live product
                <ArrowUpRight size={12} />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-950 hover:text-zinc-950"
                aria-label="Close case study"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-5 overflow-x-auto border-t border-zinc-100 px-4 hide-scrollbar sm:px-6">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`shrink-0 border-b-2 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  activeSection === section.id
                    ? 'border-emerald-500 text-zinc-950'
                    : 'border-transparent text-zinc-400 hover:text-zinc-800'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
          {/* ───────────────────────── Hero ───────────────────────── */}
          <section className="relative overflow-hidden border-b border-zinc-200/70 bg-[#f7f8f6] px-4 pb-10 pt-10 sm:px-6 lg:px-10 lg:pb-14 lg:pt-14">
            <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-teal-100/40 blur-3xl" />
            <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
              <div className="space-y-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="mint">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Flagship case study
                  </Pill>
                  <Pill>Full-stack + AI</Pill>
                  <Pill>Production-shaped</Pill>
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-3xl text-[38px] font-black leading-[0.98] tracking-[-0.055em] text-zinc-950 sm:text-[56px] lg:text-[64px]">
                    Rive — WhatsApp AI Receptionist
                  </h1>
                  <p className="max-w-2xl text-[15px] leading-7 text-zinc-600 sm:text-[16px]">
                    <strong className="font-bold text-zinc-950">Rive</strong> is a multi-tenant
                    receptionist for dental clinics: patients ask, book, reschedule and cancel on
                    WhatsApp; the clinic gets a live inbox, a day schedule, a verified answer bank
                    and a guarded human takeover path.
                  </p>
                  <p className="max-w-2xl text-[13px] leading-6 text-zinc-500">
                    I designed and built the backend, the AI agent, the React product and the
                    deployment/runtime surface. The interesting part is not the CRUD — it is what
                    happens when the model, Redis, Meta and Postgres disagree.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={RIVE_LINKS.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-600"
                  >
                    Open live product
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-600" />
                    Demo workspace — no backend required
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-600" />
                    RLS · outbox · idempotency
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
                <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-emerald-200/50 via-white/10 to-teal-200/40 blur-2xl" />
                <div className="relative rotate-[-1.5deg] rounded-[22px] border border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-950/10">
                  <div className="overflow-hidden rounded-[16px] border border-zinc-100">
                    <img
                      src="/projects/rive/screens/rive-human-takeover.jpg"
                      alt="Rive inbox showing an AI conversation with a human handover"
                      className="w-full"
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-lg sm:flex">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Database size={13} />
                  </span>
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      Isolation
                    </span>
                    <span className="block text-[11px] font-bold text-zinc-900">
                      Postgres RLS
                    </span>
                  </span>
                </div>

                <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-lg sm:flex">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <BrainCircuit size={13} />
                  </span>
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      Agent
                    </span>
                    <span className="block text-[11px] font-bold text-zinc-900">
                      LangGraph · 5 tools
                    </span>
                  </span>
                </div>

                <div className="absolute -bottom-7 right-6 hidden items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-lg sm:flex">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                    <Workflow size={13} />
                  </span>
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      Delivery
                    </span>
                    <span className="block text-[11px] font-bold text-zinc-900">
                      BullMQ outbox
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {RIVE_METRICS.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </section>

          {/* ───────────────────────── Overview ───────────────────────── */}
          <section id="rive-overview" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-6xl space-y-10">
              <SectionHeading
                index="01"
                eyebrow="The problem"
                title="Project Overview"
                intro="Answer the same questions, protect the schedule, never lose a patient message, and know when a human should take over. Rive turns that queue into a product that can run on WhatsApp — with the guarantees a clinic actually needs."
              />

              <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: 'The patient side',
                      body:
                        'A patient writes in French or English, asks about a price, needs a Saturday slot and then asks for two appointments at once. The AI answers from the clinic’s verified facts, books what it can, and escalates what it cannot.',
                      icon: MessageSquare,
                    },
                    {
                      title: 'The clinic side',
                      body:
                        'The owner sees a needs-you queue, the day’s schedule and the answer bank. They can reply, pause the AI and hand the thread back without the bot sending a stale draft.',
                      icon: UsersIcon,
                    },
                    {
                      title: 'The engineering side',
                      body:
                        'Every webhook is signed, every query is tenant-scoped, every expensive AI call is separated from the fallible send, and every booking is guarded by the database.',
                      icon: ShieldCheck,
                    },
                    {
                      title: 'The business side',
                      body:
                        'One deployment serves many clinics. Onboarding is a checklist, not a support ticket: profile, services, doctors, hours, FAQs, retrieval test and a connected WhatsApp number.',
                      icon: Layers,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm"
                      >
                        <span className="flex size-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                          <Icon size={16} />
                        </span>
                        <h3 className="mt-4 text-[14px] font-bold text-zinc-950">{item.title}</h3>
                        <p className="mt-2 text-[12px] leading-6 text-zinc-500">{item.body}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-zinc-200/80 bg-zinc-950 p-6 text-white shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                      My role
                    </p>
                    <h3 className="mt-3 text-[22px] font-black leading-tight tracking-tight">
                      My Responsibilities
                    </h3>
                    <dl className="mt-6 space-y-3 text-[11px]">
                      {[
                        ['Backend', 'NestJS modular monolith, PostgreSQL RLS, Prisma'],
                        ['AI', 'LangGraph agent, tool design, pgvector RAG'],
                        ['Async', 'BullMQ queues, outbox, reminders, retries'],
                        ['Frontend', 'React 19 inbox, schedule, answer bank, demo mode'],
                        ['Infra', 'Docker Compose, health checks, Swagger, Bull Board'],
                        ['Quality', '207 backend tests + 30 frontend tests'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex gap-4 border-t border-white/10 pt-3">
                          <dt className="w-20 shrink-0 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                            {label}
                          </dt>
                          <dd className="text-zinc-300">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/80 bg-white p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Stack
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {Array.from(
                        new Set([
                          ...RIVE_BACKEND_STACK.slice(0, 11),
                          ...RIVE_FRONTEND_STACK.slice(0, 6),
                        ]),
                      ).map((item) => (
                        <Pill key={item}>{item}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────────────── Architecture ───────────────────────── */}
          <section
            id="rive-architecture"
            className="scroll-mt-28 border-y border-zinc-200/70 bg-[#f7f8f6] px-4 py-14 sm:px-6 lg:px-10 lg:py-20"
          >
            <div className="mx-auto max-w-6xl space-y-9">
              <SectionHeading
                index="02"
                eyebrow="Architecture"
                title="System Architecture"
                intro="These are not boxes drawn after the fact. Each sequence diagram maps to code and to a guard in the system. Open one in the reader, zoom into the branch that matters, and follow the transaction."
              />

              <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
                <div className="flex min-w-[780px] items-center gap-2">
                  {[
                    { label: 'Meta webhook', icon: MessageSquare },
                    { label: 'Persist + RLS', icon: Database },
                    { label: 'Inbound queue', icon: Layers },
                    { label: 'LangGraph agent', icon: BrainCircuit },
                    { label: 'Postgres outbox', icon: Workflow },
                    { label: 'Outbound queue', icon: Network },
                    { label: 'Meta Cloud API', icon: ArrowUpRight },
                  ].map((step, index, list) => {
                    const Icon = step.icon
                    return (
                      <div key={step.label} className="flex flex-1 items-center gap-2">
                        <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl border border-zinc-200 bg-[#fafaf9] px-2 py-3 text-center">
                          <Icon size={14} className="text-emerald-700" />
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                            {step.label}
                          </span>
                        </div>
                        {index < list.length - 1 ? (
                          <ArrowRight size={13} className="shrink-0 text-zinc-300" />
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {RIVE_DIAGRAMS.map((diagram, index) => (
                  <button
                    key={diagram.id}
                    type="button"
                    onClick={() => setDiagramIndex(index)}
                    className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5"
                  >
                    <div className="relative h-44 overflow-hidden border-b border-zinc-100 bg-zinc-100">
                      <img
                        src={diagram.thumb}
                        alt={`${diagram.title} preview`}
                        className="h-full w-full object-cover object-[center_22%] opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-zinc-950/65 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {diagram.eyebrow}
                      </span>
                      <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/90 text-zinc-900 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <Maximize2 size={13} />
                      </span>
                    </div>
                    <div className="space-y-2.5 p-5">
                      <h3 className="text-[14px] font-bold leading-5 tracking-tight text-zinc-950">
                        {diagram.title}
                      </h3>
                      <p className="text-[11px] leading-5 text-zinc-500">{diagram.blurb}</p>
                      <p className="flex items-start gap-1.5 text-[10px] leading-4 text-emerald-700">
                        <CheckCircle2 size={11} className="mt-0.5 shrink-0" />
                        {diagram.proof}
                      </p>
                      <span className="inline-flex items-center gap-1 pt-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-emerald-700">
                        <ZoomIn size={10} />
                        Open pan &amp; zoom reader
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-zinc-200/70 bg-white px-4 py-3 text-[10px] text-zinc-500">
                <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-700">
                  <Move size={12} />
                  Reader controls
                </span>
                <span>Drag to pan</span>
                <span className="text-zinc-300">·</span>
                <span>Ctrl/⌘ + scroll or +/− to zoom</span>
                <span className="text-zinc-300">·</span>
                <span>Fit width, 1:1 and open original</span>
                <span className="text-zinc-300">·</span>
                <span>Arrow keys switch diagrams</span>
              </div>
            </div>
          </section>

          {/* ───────────────────────── Engineering ───────────────────────── */}
          <section id="rive-engineering" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-6xl space-y-9">
              <SectionHeading
                index="03"
                eyebrow="Engineering"
                title="Engineering Decisions"
                intro="A chatbot that answers when everything is up is a demo. The design work is what happens when Redis is down, a worker dies mid-send, a receipt arrives early, or a human takes over while the model is still thinking."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                {RIVE_PILLARS.map((pillar, index) => (
                  <article
                    key={pillar.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-100 bg-[#fafaf9] px-5 py-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                        {pillar.label}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-zinc-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <h3 className="text-[16px] font-bold leading-6 tracking-tight text-zinc-950">
                        {pillar.title}
                      </h3>
                      <p className="text-[12px] leading-6 text-zinc-500">{pillar.body}</p>
                      <ul className="space-y-2">
                        {pillar.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-[11px] leading-5 text-zinc-600">
                            <Check size={12} className="mt-0.5 shrink-0 text-emerald-600" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <pre className="mt-auto overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-3 font-mono text-[10px] leading-5 text-emerald-300">
                        <code>{pillar.snippet}</code>
                      </pre>
                    </div>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Layers,
                    title: 'Queues split by failure domain',
                    body:
                      'Inbound (LLM, concurrency 10), outbound (HTTP, concurrency 5) and reminders (delayed, concurrency 5) have separate retry budgets and cost profiles.',
                  },
                  {
                    icon: GitBranch,
                    title: 'Optimistic concurrency',
                    body:
                      'Conversation version numbers make takeover and auto-resume compare-and-set operations instead of best-effort toggles.',
                  },
                  {
                    icon: Network,
                    title: 'Provider-aware delivery',
                    body:
                      'The outbound client distinguishes retryable rate limits from permanent token, recipient and template failures instead of retrying everything.',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="rounded-2xl border border-zinc-200/80 bg-[#fafaf9] p-5">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                        <Icon size={14} />
                      </span>
                      <h4 className="mt-3 text-[12px] font-bold text-zinc-950">{item.title}</h4>
                      <p className="mt-1.5 text-[11px] leading-5 text-zinc-500">{item.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

        </div>

        <AnimatePresence>
          {diagramIndex !== null ? (
            <DiagramReader
              diagrams={RIVE_DIAGRAMS}
              index={diagramIndex}
              onIndexChange={setDiagramIndex}
              onClose={() => setDiagramIndex(null)}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function UsersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
