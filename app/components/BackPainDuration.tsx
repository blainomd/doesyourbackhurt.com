"use client";

/**
 * BackPainDuration — doesyourbackhurt.com
 *
 * Duration changes everything about what you should do next.
 * Acute (<6 wks), subacute (6 wks–3 mo), and chronic (>3 mo) back pain
 * have different evidence-based first-line treatments.
 *
 * Sources:
 *   - ACP Low Back Pain Guideline 2017 (Annals of Internal Medicine)
 *   - APTA Clinical Practice Guideline for Low Back Pain 2021
 *   - StatPearls NBK538173 — Low Back Pain Evaluation and Management
 *   - WHO Global Burden of Disease (LBP is #1 cause of disability globally)
 *   - SPORT Trials, NEJM 2006–2008 (surgery vs conservative)
 */

import { useState } from "react";
import { siteConfig } from "@/site.config";

const PRIMARY = siteConfig.primaryColor;
const ACCENT = siteConfig.accentColor;

type Phase = "acute" | "subacute" | "chronic";

const phases: {
  id: Phase;
  label: string;
  duration: string;
  prevalence: string;
  headline: string;
  firstLine: { label: string; detail: string; evidence: string }[];
  notRecommended: string[];
  whenToImage: string;
  source: string;
}[] = [
  {
    id: "acute",
    label: "Acute",
    duration: "Less than 6 weeks",
    prevalence: "About 90% of acute back pain resolves within 4–6 weeks without specific treatment.",
    headline: "Rest is not the answer — gentle movement is.",
    firstLine: [
      {
        label: "Stay active",
        detail:
          "Bed rest delays recovery. Staying active within tolerable limits — walking, light stretching, normal daily activities — produces better outcomes than rest. Patient education that emphasizes continued movement is the single most important first-line intervention. (ACP 2017)",
        evidence: "Strong evidence",
      },
      {
        label: "Superficial heat",
        detail:
          "Applied to the low back for 15–20 minutes, 3–4 times daily, heat is the most evidence-supported physical modality for acute low back pain. More effective than ice for muscle-dominant acute pain.",
        evidence: "Moderate evidence",
      },
      {
        label: "NSAIDs or acetaminophen",
        detail:
          "Ibuprofen (400–600mg with food, up to 3 times daily) or naproxen provide moderate pain relief. Acetaminophen is an alternative for those who cannot take NSAIDs. Use the lowest effective dose for the shortest time needed.",
        evidence: "Moderate evidence",
      },
    ],
    notRecommended: [
      "Bed rest for more than 1–2 days (worsens recovery)",
      "Early MRI in the absence of red flags (leads to worse outcomes)",
      "Opioids as first-line treatment (not recommended by ACP)",
      "Muscle relaxants for more than 1–2 weeks (sedating, habit-forming)",
    ],
    whenToImage:
      "Imaging is not recommended for acute nonspecific low back pain. MRI is appropriate only if red flags are present: fever, recent trauma, cancer history, unrelenting night pain, or neurological deficit (weakness, numbness). Early imaging associates with more procedures without better outcomes.",
    source: "ACP Low Back Pain Guideline 2017; StatPearls NBK538173",
  },
  {
    id: "subacute",
    label: "Subacute",
    duration: "6 weeks to 3 months",
    prevalence:
      "Pain persisting beyond 6 weeks suggests a higher likelihood of ongoing pathology or psychosocial factors that prolong recovery. This is when PT makes the biggest difference.",
    headline: "Physical therapy is now the primary intervention.",
    firstLine: [
      {
        label: "Structured physical therapy",
        detail:
          "The strongest evidence in this phase is for individualized PT (6–12 sessions) combining exercise, manual therapy, and pain neuroscience education. PT is as effective as surgery for most disc herniation and stenosis patients at 1–2 years. (SPORT Trials, NEJM)",
        evidence: "Strong evidence",
      },
      {
        label: "Epidural steroid injection (if sciatica)",
        detail:
          "For subacute sciatica from disc herniation, epidural steroid injection provides 2–6 weeks of pain relief and allows participation in PT. Useful as a bridge — not a standalone treatment. Most pain specialists recommend no more than 3 injections per year.",
        evidence: "Moderate evidence for sciatica",
      },
      {
        label: "Pain neuroscience education",
        detail:
          "Understanding that chronic back pain is often driven by a sensitized nervous system — not necessarily ongoing tissue damage — reduces fear-avoidance behavior and improves outcomes. Patients who receive PNE have significantly better functional outcomes. (Moseley GL)",
        evidence: "Strong evidence for chronic-transition prevention",
      },
    ],
    notRecommended: [
      "Prolonged opioid prescription (high risk of transitioning to long-term use)",
      "Spinal fusion for nonspecific pain without instability",
      "Continued passive treatment without active exercise",
      "Avoiding activity due to fear of making it worse",
    ],
    whenToImage:
      "MRI is appropriate at this stage if neurological deficit is present (weakness, foot drop), if pain has not improved after 4–6 weeks of conservative care, or if surgery is being actively considered. Findings must match symptoms — 30–40% of asymptomatic adults have disc bulges on MRI.",
    source: "ACP 2017; SPORT Trials NEJM 2006–2008; Moseley PNE Research",
  },
  {
    id: "chronic",
    label: "Chronic",
    duration: "More than 3 months",
    prevalence:
      "Chronic low back pain affects approximately 23% of adults worldwide and is the leading cause of disability globally. (WHO Global Burden of Disease; StatPearls NBK538173)",
    headline: "Surgery is rarely the answer — but structured treatment works.",
    firstLine: [
      {
        label: "Exercise therapy + cognitive behavioral therapy",
        detail:
          "Evidence-based first-line treatments. CBT reduces chronic pain-related disability — not because pain is 'in your head' but because it addresses how the brain processes persistent pain signals. Exercise is as effective as antidepressants for mild-moderate depression and addresses both simultaneously.",
        evidence: "Strong evidence · ACP 2017",
      },
      {
        label: "Multidisciplinary pain rehabilitation",
        detail:
          "For severe chronic LBP, structured multidisciplinary programs combining PT, psychology, and occupational therapy outperform any single-modality treatment. More effective than spine surgery in most chronic nonspecific LBP patients.",
        evidence: "Strong evidence for severe chronic LBP",
      },
      {
        label: "SNRIs (duloxetine) for centralized pain",
        detail:
          "SNRIs like duloxetine are more effective than placebo for nonspecific chronic low back pain and are preferred over opioids for long-term pharmacologic management. Tricyclic antidepressants also have evidence. Acetaminophen alone has NOT demonstrated consistent efficacy for chronic LBP beyond placebo. (StatPearls NBK538173)",
        evidence: "Moderate evidence",
      },
    ],
    notRecommended: [
      "Opioids as long-term first-line treatment (evidence limited, high harm risk)",
      "TENS units (not shown to be more effective than placebo for CLBP)",
      "Spinal fusion for nonspecific chronic back pain (no clear advantage over conservative care)",
      "Continued passive treatment without active lifestyle modification",
    ],
    whenToImage:
      "For chronic LBP without new neurological symptoms, additional imaging rarely changes management unless surgery is being seriously considered. Focus on function and quality of life rather than imaging findings — 'abnormal' MRI findings are near-universal in adults over 50 and often asymptomatic.",
    source: "ACP 2017; WHO GBD Report; StatPearls NBK538173; Cochrane CBT for CLBP 2021",
  },
];

function ArrowRight() {
  return (
    <svg className="w-4 h-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function BackPainDuration() {
  const [active, setActive] = useState<Phase>("acute");
  const phase = phases.find((p) => p.id === active)!;

  return (
    <section className="py-20" id="pain-duration">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 reveal">
          <span
            className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: PRIMARY + "15", color: PRIMARY }}
          >
            Duration changes everything
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: ACCENT }}>
            How long has your back hurt?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            The same treatment works very differently depending on whether your pain is new,
            lingering, or has been there for months. Evidence-based first-line treatment
            shifts significantly across the three phases.
          </p>
        </div>

        {/* Phase selector */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer text-center"
              style={
                active === p.id
                  ? { backgroundColor: PRIMARY, color: "#fff" }
                  : { backgroundColor: "#f3f4f6", color: "#6b7280" }
              }
            >
              <span className="block">{p.label}</span>
              <span className={`block text-[10px] mt-0.5 font-normal ${active === p.id ? "text-white/75" : "text-gray-400"}`}>
                {p.duration}
              </span>
            </button>
          ))}
        </div>

        {/* Phase detail */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm reveal">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100" style={{ backgroundColor: PRIMARY + "0a" }}>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-lg" style={{ color: ACCENT }}>
                  {phase.label} back pain
                </h3>
                <p className="text-xs font-semibold" style={{ color: PRIMARY }}>
                  {phase.duration}
                </p>
              </div>
              <span
                className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: PRIMARY + "18", color: PRIMARY }}
              >
                {phase.id === "acute" ? "Reassurance + movement" : phase.id === "subacute" ? "PT is primary" : "Biopsychosocial approach"}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{phase.prevalence}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Headline */}
            <p className="font-bold text-base" style={{ color: ACCENT }}>
              {phase.headline}
            </p>

            {/* First-line treatments */}
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{ color: PRIMARY }}
              >
                Evidence-based first-line treatment
              </p>
              <div className="space-y-4">
                {phase.firstLine.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border border-gray-100"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-sm" style={{ color: ACCENT }}>
                        {t.label}
                      </h4>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PRIMARY + "12", color: PRIMARY }}
                      >
                        {t.evidence}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Not recommended */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                Not recommended for this phase
              </p>
              <ul className="space-y-2">
                {phase.notRecommended.map((n, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#dc2626"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            {/* When to image */}
            <div
              className="rounded-xl px-4 py-4 text-xs text-gray-600 leading-relaxed border border-amber-100"
              style={{ backgroundColor: "#fffbeb" }}
            >
              <span className="font-bold text-amber-700">Imaging guidance: </span>
              {phase.whenToImage}
            </div>

            {/* Source + CTA */}
            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-[10px] text-gray-400 italic">{phase.source}</p>
              <a
                href="#assessment"
                className="inline-flex items-center text-xs font-bold transition-colors hover:opacity-80"
                style={{ color: PRIMARY }}
              >
                Take the assessment
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          This educational guide does not replace clinical evaluation. Pain with neurological
          deficits, fever, trauma, or bowel/bladder changes requires prompt medical attention.
        </p>
      </div>
    </section>
  );
}
