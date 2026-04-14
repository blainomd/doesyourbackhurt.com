"use client";

/**
 * PersonalizationCheckout
 *
 * Universal conversion step rendered at the END of every interactive tool.
 * Drop it after an assessment result, calculator output, or quiz completion.
 *
 * Props:
 *   context             — short label for what the visitor just did, used in headlines
 *                         e.g. "heart health", "hip pain", "fall prevention"
 *   recommendedCategory — comma-separated list of specific items that qualify for HSA
 *                         e.g. "cardio monitors, supplements, BP cuffs"
 *   primaryColor        — site accent color (buttons, borders); defaults to SolvingHealth teal
 *   accentColor         — site heading color; defaults to SolvingHealth navy
 *   siteDomain          — the origin site for ref tracking, e.g. "hearthealth.help"
 *   includeHsaCard      — set false for non-health sites (mapofyou) to hide the HSA path
 *   assessmentResult    — optional pass-through of raw result data (unused in render, for future analytics)
 */

interface PersonalizationCheckoutProps {
  context: string;
  recommendedCategory: string;
  primaryColor?: string;
  accentColor?: string;
  siteDomain?: string;
  includeHsaCard?: boolean;
  assessmentResult?: unknown;
}

function trackClick(event: string, siteDomain: string, path: string) {
  if (typeof window !== "undefined") {
    console.log("[PersonalizationCheckout]", {
      event,
      site: siteDomain,
      path,
      timestamp: new Date().toISOString(),
    });
  }
}

// ── Trust row icons ──────────────────────────────────────────────────

function PhysicianIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function HipaaIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function HsaIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function NationwideIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 ml-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────

export default function PersonalizationCheckout({
  context,
  recommendedCategory,
  primaryColor = "#0D7377",
  accentColor = "#1B2A4A",
  siteDomain = "solvinghealth.com",
  includeHsaCard = true,
  assessmentResult: _assessmentResult,
}: PersonalizationCheckoutProps) {
  // Derive a clean ref slug from the domain
  const refSlug = siteDomain.replace(/\./g, "-").replace(/https?:\/\//, "");

  // Build checkout URLs
  const hsaUrl = `https://hsaletter.com/checkout?category=${encodeURIComponent(recommendedCategory)}&ref=${refSlug}`;
  const coopUrl = `https://co-op.care/join?ref=${refSlug}`;
  const notReadyUrl = `https://co-op.care/?channel=${refSlug}&context=${encodeURIComponent(context)}`;

  // Capitalise first letter of context for display
  const contextDisplay = context.charAt(0).toUpperCase() + context.slice(1);

  return (
    <div className="mt-10 pt-10 border-t border-gray-200">
      {/* ── Section header ───────────────────────────────────── */}
      <div className="text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: primaryColor }}>
          Your next step
        </p>
        <h3 className="text-xl md:text-2xl font-bold" style={{ color: accentColor }}>
          Put your {contextDisplay.toLowerCase()} plan to work
        </h3>
        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Many of the items your results point to are HSA/FSA-eligible. A physician-signed letter makes it official.
        </p>
      </div>

      {/* ── Cards ────────────────────────────────────────────── */}
      <div className={`flex flex-col ${includeHsaCard ? "md:flex-row" : ""} gap-4 max-w-3xl mx-auto`}>

        {/* PATH 1: HSA Letter — shown only on health sites */}
        {includeHsaCard && (
          <div
            className="flex-1 rounded-2xl border-2 p-6 bg-white"
            style={{ borderColor: primaryColor }}
          >
            {/* Badge */}
            <div
              className="inline-block px-3 py-0.5 rounded-full text-xs font-bold text-white mb-4"
              style={{ backgroundColor: primaryColor }}
            >
              One-time · $199
            </div>

            <h4 className="text-lg font-bold mb-2" style={{ color: accentColor }}>
              Make your {contextDisplay.toLowerCase()} expenses tax-free
            </h4>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              A physician-signed Letter of Medical Necessity unlocks HSA and FSA reimbursement for:
            </p>

            <p
              className="text-sm font-semibold mb-4 leading-snug"
              style={{ color: primaryColor }}
            >
              {recommendedCategory}
            </p>

            {/* Savings callout */}
            <div className="bg-gray-50 rounded-xl p-3 mb-5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-lg font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                $
              </div>
              <div>
                <p className="text-xs text-gray-500">Estimated annual tax savings</p>
                <p className="text-lg font-bold" style={{ color: accentColor }}>~$936 / year</p>
                <p className="text-xs text-gray-400">Based on 22–32% combined federal/state bracket</p>
              </div>
            </div>

            <a
              href={hsaUrl}
              onClick={() => trackClick("hsa_letter_click", siteDomain, "hsa")}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              Get your $199 letter
              <ArrowRightIcon />
            </a>
          </div>
        )}

        {/* PATH 2: co-op.care Membership */}
        <div
          className={`flex-1 rounded-2xl border-2 p-6 bg-white ${!includeHsaCard ? "max-w-lg mx-auto w-full" : ""}`}
          style={{ borderColor: "#e5e7eb" }}
        >
          {/* Badge */}
          <div
            className="inline-block px-3 py-0.5 rounded-full text-xs font-bold text-white mb-4"
            style={{ backgroundColor: accentColor }}
          >
            Membership · $59/mo
          </div>

          <h4 className="text-lg font-bold mb-2" style={{ color: accentColor }}>
            Get everything, ongoing
          </h4>

          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Family care coordination built around your {contextDisplay.toLowerCase()} needs — and a lot more:
          </p>

          <ul className="space-y-2 mb-5">
            {[
              "Unlimited LMN letters (first one included)",
              "Sage AI — persistent, personalized health intelligence",
              "Caregiver matching and coordination",
              "Physician oversight, 50-state licensed",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <svg
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={primaryColor}
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={coopUrl}
            onClick={() => trackClick("coop_membership_click", siteDomain, "coop")}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 border-2"
            style={{ borderColor: accentColor, color: accentColor, backgroundColor: "white" }}
          >
            Join co-op.care — $59/mo
            <ArrowRightIcon />
          </a>

          <p className="text-xs text-center text-gray-400 mt-2">
            Your first LMN letter is included with membership.
          </p>
        </div>
      </div>

      {/* ── Trust row ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <PhysicianIcon />
          Physician-signed
        </span>
        <span className="flex items-center gap-1.5">
          <HipaaIcon />
          HIPAA compliant
        </span>
        <span className="flex items-center gap-1.5">
          <HsaIcon />
          IRS 213(d) eligible
        </span>
        <span className="flex items-center gap-1.5">
          <NationwideIcon />
          50-state licensed
        </span>
      </div>

      {/* ── Not ready link ───────────────────────────────────── */}
      <p className="text-center mt-5 text-sm text-gray-400">
        Not ready yet?{" "}
        <a
          href={notReadyUrl}
          onClick={() => trackClick("not_ready_click", siteDomain, "sage")}
          className="underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: primaryColor }}
        >
          Ask Sage a question instead
        </a>
      </p>

      {/* ── Powered by ───────────────────────────────────────── */}
      <p className="text-center mt-3 text-xs text-gray-300">
        Powered by SolvingHealth
      </p>
    </div>
  );
}
