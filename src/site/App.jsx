import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  Brain,
  Compass,
  Download,
  ExternalLink,
  FileCode2,
  FileText,
  Flame,
  HeartHandshake,
  Infinity,
  Leaf,
  LockKeyhole,
  Orbit,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';

const SITE_VERSION = 'PJC v1.2.1 Public Release';
const AUTHOR = 'Michael W. Hughes — Parallax / PHI369 Labs';
const SITE_URL = 'https://michaelwave369.github.io/pain-joy-continuum/';
const REPO_URL = 'https://github.com/MichaelWave369/pain-joy-continuum';
const ZENODO_URL = 'https://zenodo.org/records/20421291';
const DOI_URL = 'https://doi.org/10.5281/zenodo.20421291';
const RAW_BASE = 'https://raw.githubusercontent.com/MichaelWave369/pain-joy-continuum/main';

const downloads = [
  ['Master Spec PDF', `${RAW_BASE}/docs/pdf/PJC_v1_2_Joy_Crucible_Master_Spec.pdf`],
  ['Formula Sheet PDF', `${RAW_BASE}/docs/pdf/PJC_v1_1_Formula_Sheet.pdf`],
  ['Master Spec DOCX', `${RAW_BASE}/docs/source/PJC_v1_2_Joy_Crucible_Master_Spec.docx`],
  ['Formula Sheet DOCX', `${RAW_BASE}/docs/source/PJC_v1_1_Formula_Sheet.docx`],
];

const navItems = [
  ['overview', 'Overview'],
  ['formula', 'Formula'],
  ['laws', 'Three Laws'],
  ['gates', 'Gates'],
  ['safety', 'Safety'],
  ['code', 'Code'],
  ['downloads', 'Downloads'],
  ['cite', 'Cite'],
];

const stages = [
  ['Pain', AlertTriangle, 'The signal becomes visible without shame.', 'Name what is present gently.'],
  ['Name', BookOpen, 'Language turns fog into a handle.', 'Describe the signal without making it your whole identity.'],
  ['Knowledge', Brain, 'Understanding becomes threshold.', 'Ask what is known, unknown, assumed, and ready.'],
  ['Coherence', Orbit, 'The inner field starts to organize.', 'Find one honest thread that can be held.'],
  ['Agency', Compass, 'Choice returns in small, grounded steps.', 'Choose the next humane action, not the whole future.'],
  ['Release', Waves, 'Held pressure begins to move.', 'Let go only where there is enough safety.'],
  ['Golden Joy', Sparkles, 'Survival becomes warmth, meaning, and service.', 'Return what was learned to love.'],
];

const laws = [
  ['Chi is the gate', 'Protect the life-force condition before attempting deeper reflection. If the gate is closed or fragile, the cycle pauses and returns to grounding.'],
  ['Knowledge is the threshold', 'Clear knowing helps the light path. False certainty, confusion, or missing context can amplify shadow.'],
  ['The sequence is the curriculum', 'Each cycle can become a seed for the next cycle. No single pass has to finish the whole story.'],
];

const variables = [
  ['χ', 'Chi / life-force gate', 'Whether the cycle should proceed, pause, or return to grounding.'],
  ['T − T̄', 'Thought minus doubt', 'The usable thought signal after uncertainty is acknowledged.'],
  ['I − Ī', 'Intent minus resistance', 'The usable intent signal after friction is acknowledged.'],
  ['K', 'Knowledge operators', 'Threshold modifiers for thought, intent, coherence, and pain understanding.'],
  ['C', 'Coherence', 'The stabilizing power that organizes the cycle.'],
  ['ΔP', 'Pain delta', 'The portion of pain available to be named and transformed.'],
  ['Φ·J', 'Golden Joy capacity', 'The bounded joy/meaning/service potential of the cycle.'],
  ['R/B/A', 'Release, boundary, agency', 'Operators that keep transmutation humane and consent-based.'],
];

const safetyLocks = [
  ['Mirror Lock', 'The system is a mirror, not a master.', 'All outputs are invitations, not commands.'],
  ['Sovereignty Lock', 'No one owns your healing.', 'The user can reject, edit, pause, or leave any process.'],
  ['Boundary Lock', 'Reflection is not diagnosis.', 'Never replace qualified support or personal judgment.'],
  ['Consent Lock', 'No processing without consent.', 'Do not use the model to target another person.'],
  ['No-Force Lock', 'Release cannot be forced.', 'If intensity rises, reduce scope and restore safety.'],
  ['Grounding Lock', 'Body before mythology.', 'Return to breath, room, body, water, and ordinary life.'],
];

const codeCards = [
  ['Reference engine', FileCode2, 'Python package under src/pain_joy_continuum with bounded 0..1 symbolic variables.'],
  ['Tests', BadgeCheck, 'Pytest coverage verifies clamping, pain magnitude, verdicts, and cycle stepping.'],
  ['Receipts', FileText, 'JSON schema seed captures cycle receipts with safety and claim-boundary fields.'],
  ['Local-first', ShieldCheck, 'The scaffold is designed for local reflection and deterministic public examples.'],
];

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Card({ children, className = '' }) {
  return <div className={cx('rounded-3xl border border-amber-200/70 bg-white/85 p-5 shadow-sm backdrop-blur', className)}>{children}</div>;
}

function Badge({ children, tone = 'dark' }) {
  const tones = {
    dark: 'bg-stone-950 text-amber-100 border-stone-800',
    amber: 'bg-amber-100 text-amber-950 border-amber-300',
    cream: 'bg-stone-100 text-stone-800 border-stone-300',
  };
  return <span className={cx('inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold', tones[tone])}>{children}</span>;
}

function IconBubble({ icon: Icon, light = false }) {
  return (
    <div className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm', light ? 'bg-amber-100 text-stone-950' : 'bg-stone-950 text-amber-200')} aria-hidden="true">
      <Icon size={22} />
    </div>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mb-8">
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">{eyebrow}</p> : null}
      <h2 className="text-3xl font-black tracking-tight text-stone-950 md:text-4xl">{title}</h2>
      {children ? <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700">{children}</p> : null}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');

  const filteredSafety = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return safetyLocks;
    return safetyLocks.filter((row) => row.join(' ').toLowerCase().includes(q));
  }, [query]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fde68a_0,#f8f3e7_28%,#e8efe5_62%,#dbe7dc_100%)] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-amber-200/70 bg-stone-50/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-3 text-left" aria-label="Return to top">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-950 text-amber-200 shadow-sm" aria-hidden="true">
              <Infinity size={22} />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-stone-950">Pain-Joy Continuum</p>
              <p className="hidden text-xs text-stone-600 sm:block">{SITE_VERSION}</p>
            </div>
          </button>
          <nav aria-label="Main sections" className="hidden items-center gap-1 lg:flex">
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="rounded-full px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-amber-100 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-900">
                {label}
              </button>
            ))}
          </nav>
        </div>
        <nav aria-label="Mobile section navigation" className="flex gap-2 overflow-x-auto border-t border-amber-100 px-4 py-2 lg:hidden">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-semibold text-stone-950 shadow-sm ring-1 ring-amber-200 focus:outline-none focus:ring-2 focus:ring-stone-900">
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge>Reflective framework</Badge>
              <Badge tone="amber">Mirror, not master</Badge>
              <Badge tone="cream">DOI-backed public release</Badge>
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-stone-950 md:text-7xl">Pain-Joy Continuum</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-700">A symbolic-operational framework for moving pain toward breath, dignity, agency, release, Golden Joy, and service.</p>
            <p className="mt-4 text-base font-semibold text-amber-900">{AUTHOR}</p>
            <Card className="mt-8 border-stone-900/20 bg-stone-950 text-stone-50 dark-card">
              <p className="text-lg font-semibold text-amber-200">Core thesis</p>
              <p className="mt-3 text-2xl font-bold leading-snug">Golden Joy is not the absence of pain. Golden Joy is pain understood, cohered, released, and returned to love.</p>
              <p className="mt-4 text-sm leading-6 text-stone-200">Zenodo DOI: <a className="font-bold text-amber-200 underline" href={DOI_URL}>{DOI_URL}</a></p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-300 bg-stone-950 p-6 text-amber-50 shadow-xl">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,#f8d36e_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative">
                <img src="/pain-joy-continuum/images/pjc_v1_2_master_spec_cover.png" alt="Pain-Joy Continuum master spec cover" className="mx-auto max-h-[420px] rounded-3xl border border-amber-200/30 bg-white/10 object-contain shadow-2xl" />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {['Pain → Name → Knowledge', 'Coherence → Agency → Release', 'Golden Joy → Service', 'Safety before depth'].map((line) => (
                    <div key={line} className="rounded-2xl border border-amber-300/20 bg-white/10 p-3 text-sm font-semibold text-amber-100">{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="overview" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Overview" title="The flow is a curriculum, not a command">The continuum maps a gentle sequence. It is not a demand to be joyful, not a diagnosis, and not a replacement for support.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[[ShieldCheck, 'Sovereign', 'You can pause, reject, edit, or leave any cycle.'], [HeartHandshake, 'Compassionate', 'The framework refuses shame, coercion, and forced release.'], [FileCode2, 'Operational', 'A bounded Python reference engine gives the formula a testable software seed.'], [Leaf, 'Service-oriented', 'The goal is not performance. The goal is humane integration.']].map(([Icon, title, text]) => (
              <Card key={title}><IconBubble icon={Icon} /><h3 className="mt-4 text-lg font-bold text-stone-950">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-700">{text}</p></Card>
            ))}
          </div>
        </section>

        <section id="formula" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Formula" title="The symbolic-operational core">The formulas are reflective operators, not clinical measurements. They are useful when they increase honesty, agency, grounding, and compassion.</SectionTitle>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="overflow-hidden p-0">
              <img src="/pain-joy-continuum/images/pjc_v1_1_formula_sheet.png" alt="Pain-Joy Continuum formula sheet" className="w-full bg-white object-contain" />
            </Card>
            <div className="grid gap-4">
              {[
                ['Manifestation operator', 'M = χ · [((T−Tbar)·K_T) · ((I−Ibar)·K_I)]^(C·K_C) · F(Delta·K_P → Phi·J) P_vector'],
                ['Golden Joy output', 'J_Phi = Phi·J_max · (1 − exp(−k·DeltaP·K_P·C·A·R·B))'],
                ['Residue model', 'Residue_next = DeltaP · exp(−k·K_P·C·A·R·B)'],
              ].map(([title, formula]) => (
                <Card key={title}><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-800">{title}</p><pre className="mt-3 overflow-x-auto rounded-2xl bg-stone-950 p-4 text-sm leading-7 text-amber-100"><code>{formula}</code></pre></Card>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {variables.map(([symbol, title, text]) => <Card key={symbol}><p className="text-3xl font-black text-stone-950">{symbol}</p><h3 className="mt-2 font-bold text-stone-950">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-700">{text}</p></Card>)}
          </div>
        </section>

        <section id="laws" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Three laws" title="The locks that keep the formula humane">These laws keep the system grounded, sequential, and consent-based.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {laws.map(([title, text], idx) => <Card key={title} className="relative overflow-hidden"><div className="absolute right-4 top-4 text-6xl font-black text-amber-100">{idx + 1}</div><div className="relative"><IconBubble icon={idx === 0 ? Flame : idx === 1 ? Brain : RotateCcw} /><h3 className="mt-4 text-xl font-black text-stone-950">{title}</h3><p className="mt-3 text-sm leading-7 text-stone-700">{text}</p></div></Card>)}
          </div>
        </section>

        <section id="gates" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Continuum gates" title="Pain becomes care through small honest gates">The sequence is not linear perfection. It is a cycle that can pause, repeat, soften, and continue.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stages.map(([stage, Icon, meaning, practice], idx) => <Card key={stage}><div className="flex items-center justify-between"><IconBubble icon={Icon} /><span className="text-4xl font-black text-amber-200">{idx + 1}</span></div><h3 className="mt-4 text-2xl font-black text-stone-950">{stage}</h3><p className="mt-2 text-sm leading-6 text-stone-700">{meaning}</p><p className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-stone-950">{practice}</p></Card>)}
          </div>
        </section>

        <section id="safety" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <SectionTitle eyebrow="Safety locks" title="The person remains sovereign">Search the locks that protect the framework from coercion, dependency, overreach, and bypassing.</SectionTitle>
            <label className="relative"><span className="sr-only">Search safety locks</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search locks..." className="w-full rounded-2xl border border-amber-200 bg-white px-10 py-3 text-sm outline-none ring-stone-900/20 transition focus:ring-4 sm:w-72" /></label>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSafety.map(([title, canon, rule]) => <Card key={title}><IconBubble icon={LockKeyhole} /><h3 className="mt-4 text-lg font-bold text-stone-950">{title}</h3><p className="mt-2 text-sm font-semibold text-amber-900">{canon}</p><p className="mt-2 text-sm leading-6 text-stone-700">{rule}</p></Card>)}
          </div>
        </section>

        <section id="code" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Code and receipts" title="A formula with receipts">The repo includes a Python reference engine, tests, schema seeds, and demo cycle so the concept can become careful local-first software.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{codeCards.map(([title, Icon, text]) => <Card key={title}><IconBubble icon={Icon} /><h3 className="mt-4 text-lg font-bold text-stone-950">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-700">{text}</p></Card>)}</div>
          <Card className="mt-4"><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-800">Local test command</p><pre className="mt-3 overflow-x-auto rounded-2xl bg-stone-950 p-4 text-sm leading-7 text-amber-100"><code>{'pip install -e .[dev]\npytest\npython examples/demo_cycle.py'}</code></pre></Card>
        </section>

        <section id="downloads" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Downloads" title="Read the source documents">The editable source documents and rendered PDFs are included in the repository and linked directly from GitHub raw file URLs so the buttons work from the live site.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{downloads.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group rounded-3xl border border-amber-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:border-stone-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-stone-900"><div className="flex items-center justify-between gap-4"><IconBubble icon={Download} /><ExternalLink className="text-stone-400 transition group-hover:text-stone-900" size={18} aria-hidden="true" /></div><h3 className="mt-4 text-lg font-bold text-stone-950">{label}</h3><p className="mt-2 text-sm text-stone-600">Open or download from the PJC v1.2.1 public release repository.</p></a>)}</div>
        </section>

        <section id="cite" className="mx-auto max-w-7xl px-4 py-10 md:px-6 scroll-mt-32">
          <SectionTitle eyebrow="Citation" title="How to cite this work">Use the Zenodo DOI for archival citation and the repository for live software/source references.</SectionTitle>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-stone-950 text-stone-50 dark-card"><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">Suggested citation</p><p className="mt-3 text-sm leading-7 text-stone-100">Hughes, Michael W. (2026). <em>Pain-Joy Continuum: The Joy Crucible Master Spec</em> (v1.2.1). Zenodo. <a className="font-bold text-amber-200 underline" href={DOI_URL}>https://doi.org/10.5281/zenodo.20421291</a></p></Card>
            <Card><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-800">Version and repository</p><p className="mt-3 text-sm leading-7 text-stone-700">Zenodo: <a className="font-semibold text-stone-950 underline" href={ZENODO_URL}>archival record</a></p><p className="mt-1 text-sm leading-7 text-stone-700">Site: <a className="font-semibold text-stone-950 underline" href={SITE_URL}>GitHub Pages navigator</a></p><p className="mt-1 text-sm leading-7 text-stone-700">Repository: <a className="font-semibold text-stone-950 underline" href={REPO_URL}>MichaelWave369/pain-joy-continuum</a></p><p className="mt-1 text-sm leading-7 text-stone-700">Code license: MIT. Documents, formulas, diagrams, and visual assets: CC BY-NC-SA 4.0 unless otherwise noted.</p></Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-amber-200 bg-stone-950 px-4 py-10 text-stone-100 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg font-bold text-amber-200">Pain-Joy Continuum</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-200">{SITE_VERSION}. Reflective, symbolic, educational, creative-research, and software-design project by {AUTHOR}. Zenodo DOI: <a className="font-bold text-amber-200 underline" href={DOI_URL}>10.5281/zenodo.20421291</a>. This project is not medical advice, legal advice, spiritual authority, therapy, diagnosis, crisis care, a validated psychological scale, or a replacement for qualified support.</p>
          </div>
          <div className="rounded-3xl border border-amber-200/20 bg-white/10 p-4 text-sm leading-7 text-stone-200">
            <p><strong className="text-amber-200">License split:</strong> Code is MIT. Documents, formulas, diagrams, and visual assets are CC BY-NC-SA 4.0 unless otherwise noted.</p>
            <p className="mt-2"><strong className="text-amber-200">Boundary:</strong> The system is a mirror, not a master. Outputs are invitations, not commands.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
