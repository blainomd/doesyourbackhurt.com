"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/site.config";

interface Story {
  id: string;
  handle: string;
  monthsIn: number | null;
  storyText: string;
  condition: string;
  submittedAt: string;
}

type StageFilter = "all" | "starting" | "first_year" | "years_in" | "beyond";

function stageLabel(monthsIn: number | null): string {
  if (monthsIn === null) return "Someone on this journey";
  if (monthsIn <= 3) return `Someone ${monthsIn} month${monthsIn === 1 ? "" : "s"} in`;
  if (monthsIn <= 12) return `Someone ${monthsIn} months in`;
  const years = Math.floor(monthsIn / 12);
  return `Someone ${years} year${years === 1 ? "" : "s"} in`;
}

function stageCategory(monthsIn: number | null): StageFilter {
  if (monthsIn === null) return "starting";
  if (monthsIn <= 1) return "starting";
  if (monthsIn <= 12) return "first_year";
  if (monthsIn <= 36) return "years_in";
  return "beyond";
}

/* ─── Share Story Tab ─────────────────────────────────────────────── */
function ShareStoryTab() {
  const [storyText, setStoryText] = useState("");
  const [monthsIn, setMonthsIn] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!storyText.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/community/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyText: storyText.trim(),
          monthsIn: monthsIn ? parseInt(monthsIn, 10) : null,
          condition: siteConfig.chatChannel,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ backgroundColor: siteConfig.primaryColor + "15" }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={siteConfig.primaryColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-bold mb-2" style={{ color: siteConfig.accentColor }}>
          Thank you.
        </p>
        <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
          Your story will help someone you will never meet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
          What would you tell someone just starting this journey?
        </label>
        <textarea
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
          rows={5}
          maxLength={1000}
          placeholder="Write whatever feels true. No wrong answers. Just your honest experience."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 resize-none leading-relaxed"
          style={{ "--tw-ring-color": siteConfig.primaryColor } as React.CSSProperties}
          required
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{storyText.length}/1000</p>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
          How long have you been dealing with this? (optional)
        </label>
        <select
          value={monthsIn}
          onChange={(e) => setMonthsIn(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 bg-white"
          style={{ "--tw-ring-color": siteConfig.primaryColor } as React.CSSProperties}
        >
          <option value="">Prefer not to say</option>
          <option value="1">Less than a month</option>
          <option value="2">1-3 months</option>
          <option value="6">3-6 months</option>
          <option value="9">6-12 months</option>
          <option value="18">1-2 years</option>
          <option value="30">2-3 years</option>
          <option value="48">More than 3 years</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !storyText.trim()}
        className="w-full py-4 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-40 cursor-pointer"
        style={{ backgroundColor: siteConfig.primaryColor }}
      >
        {submitting ? "Sharing..." : "Share your story"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        Your story is anonymous. No name, no account, no tracking.
      </p>
    </form>
  );
}

/* ─── Read Stories Tab ────────────────────────────────────────────── */
function ReadStoriesTab() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StageFilter>("all");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/community/stories?condition=${siteConfig.chatChannel}`);
        if (res.ok) {
          const data = await res.json();
          setStories(data.stories || []);
        }
      } catch {
        // silent fail — show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filterOptions: { value: StageFilter; label: string }[] = [
    { value: "all", label: "All stories" },
    { value: "starting", label: "Just starting" },
    { value: "first_year", label: "First year" },
    { value: "years_in", label: "Years in" },
    { value: "beyond", label: "Beyond" },
  ];

  const filtered = filter === "all" ? stories : stories.filter((s) => stageCategory(s.monthsIn) === filter);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-gray-200 rounded-full mx-auto animate-spin" style={{ borderTopColor: siteConfig.primaryColor }} />
      </div>
    );
  }

  return (
    <div>
      {/* Filter row */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === opt.value ? "text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
            }`}
            style={filter === opt.value ? { backgroundColor: siteConfig.primaryColor } : undefined}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 px-6">
          <p className="text-gray-500 leading-relaxed">
            {stories.length === 0
              ? "Be the first to share. Your words will reach someone tomorrow."
              : "No stories match this filter yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: siteConfig.primaryColor }}>
                {stageLabel(story.monthsIn)}
              </p>
              <p className="text-gray-700 leading-relaxed text-sm">
                &ldquo;{story.storyText}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Find Someone Tab ────────────────────────────────────────────── */
function FindSomeoneTab() {
  const [stage, setStage] = useState("");
  const [concern, setConcern] = useState("");
  const [helpType, setHelpType] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !helpType) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/community/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          concern: concern.trim(),
          helpType,
          email: email.trim(),
          condition: siteConfig.chatChannel,
          conditionName: siteConfig.name,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ backgroundColor: siteConfig.primaryColor + "15" }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={siteConfig.primaryColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-lg font-bold mb-2" style={{ color: siteConfig.accentColor }}>
          We will find you someone.
        </p>
        <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
          We will connect you with someone who matches within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
          Where are you in your journey?
        </label>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 bg-white"
          style={{ "--tw-ring-color": siteConfig.primaryColor } as React.CSSProperties}
        >
          <option value="">Select a stage</option>
          <option value="just_diagnosed">Just diagnosed or starting out</option>
          <option value="first_year">First year — figuring things out</option>
          <option value="stable">Stable but managing it long-term</option>
          <option value="years_in">Several years in</option>
          <option value="caregiver">I am a caregiver for someone with this</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
          What is your biggest concern right now? (optional)
        </label>
        <input
          type="text"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          maxLength={200}
          placeholder="e.g., understanding my options, managing daily symptoms, telling family..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2"
          style={{ "--tw-ring-color": siteConfig.primaryColor } as React.CSSProperties}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
          What kind of connection are you looking for?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "listen", label: "Someone to listen", desc: "I want to feel less alone" },
            { value: "advice", label: "Practical advice", desc: "What actually helped you?" },
            { value: "been_there", label: "Been there", desc: "You made it through — tell me" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setHelpType(opt.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                helpType === opt.value ? "border-current" : "border-gray-200 hover:border-gray-300"
              }`}
              style={helpType === opt.value ? { borderColor: siteConfig.primaryColor, backgroundColor: siteConfig.primaryColor + "08" } : undefined}
            >
              <p className="text-sm font-bold" style={helpType === opt.value ? { color: siteConfig.primaryColor } : { color: "#374151" }}>
                {opt.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: siteConfig.accentColor }}>
          Your email — so we can connect you
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2"
          style={{ "--tw-ring-color": siteConfig.primaryColor } as React.CSSProperties}
        />
        <p className="text-xs text-gray-400 mt-1">Used only to make the introduction. Never shared or marketed to.</p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !email.trim() || !helpType}
        className="w-full py-4 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-40 cursor-pointer"
        style={{ backgroundColor: siteConfig.primaryColor }}
      >
        {submitting ? "Sending..." : "Find someone like me"}
      </button>
    </form>
  );
}

/* ─── Main Community Component ────────────────────────────────────── */
type Tab = "share" | "read" | "find";

export default function Community() {
  const [tab, setTab] = useState<Tab>("read");

  const tabs: { id: Tab; label: string }[] = [
    { id: "share", label: "Share your story" },
    { id: "read", label: "Read stories" },
    { id: "find", label: "Find someone like you" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            We help each other.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Real people who have been where you are. Real words. Real stories.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-8">
          <p className="text-xs text-amber-700 leading-relaxed">
            These are peer-to-peer stories, not medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                tab === t.id ? "text-white shadow-md" : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
              }`}
              style={tab === t.id ? { backgroundColor: siteConfig.primaryColor } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          {tab === "share" && <ShareStoryTab />}
          {tab === "read" && <ReadStoriesTab />}
          {tab === "find" && <FindSomeoneTab />}
        </div>
      </div>
    </section>
  );
}
