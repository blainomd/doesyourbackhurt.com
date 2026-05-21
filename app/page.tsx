"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";

/* ─── Types ───────────────────────────────────────────────────────── */

type Step = "start" | "q1" | "q2" | "q3" | "q4" | "result";
type Location = "neck" | "upper" | "lower" | "all_over";
type Duration = "days" | "weeks" | "months" | "years";
type RedFlag = "bowel_bladder" | "fever" | "trauma" | "none";
type Character = "sharp_shooting" | "dull_aching" | "stiffness" | "constant";

interface Answers {
  location: Location | null;
  duration: Duration | null;
  redFlag: RedFlag | null;
  character: Character | null;
}

type Route = "urgent" | "structural" | "inflammatory" | "chronic" | "acute_muscle";

/* ─── Routing ─────────────────────────────────────────────────────── */

function computeRoute(a: Answers): Route {
  if (a.redFlag && a.redFlag !== "none") return "urgent";
  if (a.character === "sharp_shooting") return "structural";
  if (a.character === "stiffness" || a.character === "constant") return "inflammatory";
  if (a.duration === "months" || a.duration === "years") return "chronic";
  return "acute_muscle";
}

/* ─── Result cards ────────────────────────────────────────────────── */

const ROUTES: Record<Route, { headline: string; body: string; cta: string; href: string; urgent: boolean }> = {
  urgent: {
    headline: "This needs urgent evaluation.",
    body: "The symptom you described — bowel or bladder changes, fever, or recent trauma — can signal a serious condition. Do not wait. Call your doctor or go to urgent care today.",
    cta: "Find urgent care near you",
    href: "https://www.zocdoc.com/search?reason_visit=back-pain",
    urgent: true,
  },
  structural: {
    headline: "Your pain pattern suggests a structural issue.",
    body: "Sharp or shooting pain — especially down the leg — often comes from disc herniation or nerve compression. An orthopedic evaluation can confirm and get you a clear treatment plan.",
    cta: "See a spine specialist",
    href: "https://www.surgeonvalue.com",
    urgent: false,
  },
  inflammatory: {
    headline: "Your pattern may be inflammatory, not structural.",
    body: "Morning stiffness or constant aching that does not follow a mechanical pattern can signal an inflammatory condition. A rheumatology evaluation is worth considering.",
    cta: "Learn about care coordination",
    href: "https://www.co-op.care",
    urgent: false,
  },
  chronic: {
    headline: "You have chronic back pain that can be managed.",
    body: "Pain lasting months or years is rarely surgical. Physical therapy, movement tracking, and consistent exercise have the strongest evidence base. JointCoach can help you track your progress.",
    cta: "Start tracking with JointCoach",
    href: "https://www.jointcoach.com",
    urgent: false,
  },
  acute_muscle: {
    headline: "This looks like an acute muscle or soft-tissue strain.",
    body: "Most back pain — especially recent onset — is muscular. Heat, gentle movement, and anti-inflammatories work well. If it is not improving in 2–3 weeks, or gets worse, see your doctor.",
    cta: "Track your recovery",
    href: "https://www.jointcoach.com",
    urgent: false,
  },
};

/* ─── Shared UI ───────────────────────────────────────────────────── */

function ChevronRight() {
  return (
    <svg className="w-4 h-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Btn({ onClick, disabled, children, variant = "primary" }: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  if (variant === "ghost") {
    return (
      <button onClick={onClick} className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 cursor-pointer"
      style={{ backgroundColor: siteConfig.primaryColor }}
    >
      {children}
    </button>
  );
}

function OptionBtn({ label, sub, selected, onClick }: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-sm cursor-pointer ${
        selected ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-800 hover:border-gray-400"
      }`}
      style={selected ? { backgroundColor: siteConfig.primaryColor, borderColor: siteConfig.primaryColor } : undefined}
    >
      <span className="block font-semibold">{label}</span>
      {sub && (
        <span className={`block text-xs mt-0.5 ${selected ? "text-white/75" : "text-gray-500"}`}>{sub}</span>
      )}
    </button>
  );
}

function Progress({ step }: { step: Step }) {
  const steps: Step[] = ["q1", "q2", "q3", "q4", "result"];
  const idx = steps.indexOf(step);
  const pct = idx < 0 ? 0 : ((idx + 1) / steps.length) * 100;
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8">
      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: siteConfig.primaryColor }} />
    </div>
  );
}

function StepHeader({ n, label }: { n: number; label: string }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Question {n} of 4</p>
      <h2 className="text-xl font-bold mb-6" style={{ color: siteConfig.accentColor }}>{label}</h2>
    </>
  );
}

/* ─── Assessment ──────────────────────────────────────────────────── */

function Assessment() {
  const [step, setStep] = useState<Step>("start");
  const [answers, setAnswers] = useState<Answers>({ location: null, duration: null, redFlag: null, character: null });

  function reset() {
    setStep("start");
    setAnswers({ location: null, duration: null, redFlag: null, character: null });
  }

  const route = step === "result" ? computeRoute(answers) : null;
  const result = route ? ROUTES[route] : null;

  return (
    <div className="max-w-xl mx-auto">

      {/* Start */}
      {step === "start" && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
            Four questions. Under a minute. Tells you whether to rest, see a doctor, or see a specialist.
          </p>
          <button
            onClick={() => setStep("q1")}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white text-lg font-bold transition-all hover:opacity-90 shadow-md cursor-pointer"
            style={{ backgroundColor: siteConfig.primaryColor }}
          >
            Start assessment <ChevronRight />
          </button>
        </div>
      )}

      {/* Q1: Location */}
      {step === "q1" && (
        <div>
          <Progress step={step} />
          <StepHeader n={1} label="Where does it hurt?" />
          <div className="space-y-3">
            <OptionBtn label="Neck / cervical spine" sub="Upper back of the neck, between the shoulders" selected={answers.location === "neck"} onClick={() => setAnswers(a => ({ ...a, location: "neck" }))} />
            <OptionBtn label="Mid-back / thoracic spine" sub="Between the shoulder blades" selected={answers.location === "upper"} onClick={() => setAnswers(a => ({ ...a, location: "upper" }))} />
            <OptionBtn label="Lower back / lumbar spine" sub="Belt-line area, most common" selected={answers.location === "lower"} onClick={() => setAnswers(a => ({ ...a, location: "lower" }))} />
            <OptionBtn label="All over / hard to pinpoint" selected={answers.location === "all_over"} onClick={() => setAnswers(a => ({ ...a, location: "all_over" }))} />
          </div>
          <div className="mt-6 flex justify-end">
            <Btn disabled={!answers.location} onClick={() => setStep("q2")}>Next <ChevronRight /></Btn>
          </div>
        </div>
      )}

      {/* Q2: Duration */}
      {step === "q2" && (
        <div>
          <Progress step={step} />
          <StepHeader n={2} label="How long has this been going on?" />
          <div className="space-y-3">
            <OptionBtn label="Days" sub="Less than two weeks" selected={answers.duration === "days"} onClick={() => setAnswers(a => ({ ...a, duration: "days" }))} />
            <OptionBtn label="Weeks" sub="Two weeks to one month" selected={answers.duration === "weeks"} onClick={() => setAnswers(a => ({ ...a, duration: "weeks" }))} />
            <OptionBtn label="Months" sub="One to six months" selected={answers.duration === "months"} onClick={() => setAnswers(a => ({ ...a, duration: "months" }))} />
            <OptionBtn label="More than six months / years" selected={answers.duration === "years"} onClick={() => setAnswers(a => ({ ...a, duration: "years" }))} />
          </div>
          <div className="mt-6 flex justify-between">
            <Btn variant="ghost" onClick={() => setStep("q1")}>Back</Btn>
            <Btn disabled={!answers.duration} onClick={() => setStep("q3")}>Next <ChevronRight /></Btn>
          </div>
        </div>
      )}

      {/* Q3: Red flags */}
      {step === "q3" && (
        <div>
          <Progress step={step} />
          <StepHeader n={3} label="Do you have any of these?" />
          <p className="text-sm text-gray-500 -mt-4 mb-6">Select the one that best applies. If none, choose the last option.</p>
          <div className="space-y-3">
            <OptionBtn label="Bowel or bladder problems" sub="New loss of control or inability to go" selected={answers.redFlag === "bowel_bladder"} onClick={() => setAnswers(a => ({ ...a, redFlag: "bowel_bladder" }))} />
            <OptionBtn label="Fever with back pain" sub="Temperature over 101°F alongside the pain" selected={answers.redFlag === "fever"} onClick={() => setAnswers(a => ({ ...a, redFlag: "fever" }))} />
            <OptionBtn label="Recent trauma or injury" sub="Fall, accident, or direct impact" selected={answers.redFlag === "trauma"} onClick={() => setAnswers(a => ({ ...a, redFlag: "trauma" }))} />
            <OptionBtn label="None of these" selected={answers.redFlag === "none"} onClick={() => setAnswers(a => ({ ...a, redFlag: "none" }))} />
          </div>
          <div className="mt-6 flex justify-between">
            <Btn variant="ghost" onClick={() => setStep("q2")}>Back</Btn>
            <Btn
              disabled={!answers.redFlag}
              onClick={() => {
                if (answers.redFlag && answers.redFlag !== "none") setStep("result");
                else setStep("q4");
              }}
            >
              Next <ChevronRight />
            </Btn>
          </div>
        </div>
      )}

      {/* Q4: Character */}
      {step === "q4" && (
        <div>
          <Progress step={step} />
          <StepHeader n={4} label="What does the pain feel like?" />
          <div className="space-y-3">
            <OptionBtn label="Sharp or shooting" sub="Radiates down the arm or leg, electric or stabbing" selected={answers.character === "sharp_shooting"} onClick={() => setAnswers(a => ({ ...a, character: "sharp_shooting" }))} />
            <OptionBtn label="Dull or aching" sub="Constant background pain, sore muscles" selected={answers.character === "dull_aching"} onClick={() => setAnswers(a => ({ ...a, character: "dull_aching" }))} />
            <OptionBtn label="Stiffness" sub="Hard to move, especially in the morning" selected={answers.character === "stiffness"} onClick={() => setAnswers(a => ({ ...a, character: "stiffness" }))} />
            <OptionBtn label="Constant ache at rest" sub="Pain that does not improve with position changes" selected={answers.character === "constant"} onClick={() => setAnswers(a => ({ ...a, character: "constant" }))} />
          </div>
          <div className="mt-6 flex justify-between">
            <Btn variant="ghost" onClick={() => setStep("q3")}>Back</Btn>
            <Btn disabled={!answers.character} onClick={() => setStep("result")}>See my result <ChevronRight /></Btn>
          </div>
        </div>
      )}

      {/* Result */}
      {step === "result" && result && (
        <div>
          {result.urgent && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#B45309" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm text-amber-800 font-medium leading-snug">
                You described a red-flag symptom. Please seek care today — do not rely on this assessment alone.
              </p>
            </div>
          )}
          <div className="rounded-2xl p-6 border-2" style={{ borderColor: result.urgent ? "#B45309" : siteConfig.primaryColor }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: result.urgent ? "#92400E" : siteConfig.accentColor }}>
              {result.headline}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{result.body}</p>
            <a
              href={result.href}
              target={result.href.startsWith("http") ? "_blank" : undefined}
              rel={result.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: result.urgent ? "#92400E" : siteConfig.primaryColor }}
            >
              {result.cta} <ChevronRight />
            </a>
          </div>
          <button onClick={reset} className="mt-4 text-sm text-gray-400 hover:text-gray-600 cursor-pointer block mx-auto">
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Schema ──────────────────────────────────────────────────────── */

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Lower Back Pain",
  alternateName: ["Lumbago", "Sciatica", "Herniated Disc", "Spinal Stenosis"],
  description: siteConfig.description,
  url: `https://${siteConfig.domain}`,
  possibleTreatment: [
    { "@type": "MedicalTherapy", name: "Physical Therapy" },
    { "@type": "MedicalTherapy", name: "Core Strengthening Exercise" },
    { "@type": "MedicalTherapy", name: "Anti-Inflammatory Medication" },
    { "@type": "MedicalTherapy", name: "Spine Surgery" },
  ],
  relevantSpecialty: { "@type": "MedicalSpecialty", name: "Orthopedic Surgery" },
};

/* ─── Page ────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-base font-bold" style={{ color: siteConfig.accentColor }}>doesyourbackhurt.com</span>
          <a
            href="#assessment"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: siteConfig.primaryColor }}
          >
            Take assessment
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ backgroundColor: siteConfig.accentColor }}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight whitespace-pre-line">
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-5 text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            {siteConfig.heroSubtitle}
          </p>
          <a
            href="#assessment"
            className="mt-8 inline-flex items-center px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 shadow-lg"
            style={{ backgroundColor: siteConfig.primaryColor }}
          >
            Start the assessment <ChevronRight />
          </a>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ color: siteConfig.accentColor }}>Back pain assessment</h2>
            <p className="text-gray-500 text-sm mt-2">Educational triage — not a diagnosis. Free, no login.</p>
          </div>
          <Assessment />
        </div>
      </section>

      {/* Routing CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: siteConfig.accentColor }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-2">Where to go next</h2>
          <p className="text-gray-300 text-sm mb-8 max-w-xl mx-auto">
            Most back pain is not surgical. Knowing which path fits your situation saves time, money, and worry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Structural pain", desc: "Sharp, radiating, or nerve pain — see a spine specialist", site: "surgeonvalue.com", href: "https://www.surgeonvalue.com" },
              { label: "Chronic pain", desc: "Months or years of pain — track PT progress and adherence", site: "jointcoach.com", href: "https://www.jointcoach.com" },
              { label: "Care coordination", desc: "Need help navigating next steps", site: "co-op.care", href: "https://www.co-op.care" },
            ].map(({ label, desc, site, href }) => (
              <a key={site} href={href} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-5 text-left transition-all">
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-gray-300 text-xs">{desc}</p>
                <p className="text-white text-xs mt-3 font-medium">{site} &rarr;</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Not a diagnosis. If you have severe pain, loss of bowel or bladder function, or fever with back pain, seek immediate medical care. Always consult a qualified healthcare provider for diagnosis and treatment.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
            <a href={siteConfig.ecosystemLinks.surgeonvalue} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">SurgeonValue</a>
            <a href={siteConfig.ecosystemLinks.coopccare} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">co-op.care</a>
            <a href={siteConfig.ecosystemLinks.solvinghealth} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">SolvingHealth</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
