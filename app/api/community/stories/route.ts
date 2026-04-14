import { NextRequest, NextResponse } from "next/server";

// ─── Supabase helpers ────────────────────────────────────────────────
// Uses Supabase if SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
// Falls back to console logging (no persistence) for local/MVP use.

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function hasSupabase() {
  return !!(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseInsertStory(story: {
  id: string;
  handle: string;
  months_in: number | null;
  story_text: string;
  condition: string;
  submitted_at: string;
}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/community_stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(story),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${text}`);
  }
}

async function supabaseFetchStories(condition: string): Promise<unknown[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/community_stories?condition=eq.${encodeURIComponent(condition)}&order=submitted_at.desc&limit=50`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!res.ok) return [];
  return res.json();
}

// ─── POST — submit a story ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storyText, monthsIn, condition } = body;

    if (!storyText || typeof storyText !== "string" || storyText.trim().length < 5) {
      return NextResponse.json({ error: "Story text is required." }, { status: 400 });
    }
    if (!condition || typeof condition !== "string") {
      return NextResponse.json({ error: "Condition is required." }, { status: 400 });
    }

    const story = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      handle: "anonymous",
      months_in: typeof monthsIn === "number" ? monthsIn : null,
      story_text: storyText.trim().slice(0, 1000),
      condition: condition.trim().toLowerCase(),
      submitted_at: new Date().toISOString(),
    };

    if (hasSupabase()) {
      await supabaseInsertStory(story);
    } else {
      console.log("[community/stories] New story (no Supabase configured):", JSON.stringify(story, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[community/stories] POST error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ─── GET — fetch stories for a condition ─────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const condition = searchParams.get("condition") || "";

    if (!condition) {
      return NextResponse.json({ stories: [] });
    }

    if (hasSupabase()) {
      const rows = await supabaseFetchStories(condition.toLowerCase());
      // Map snake_case Supabase columns to camelCase for the client
      const stories = (rows as Array<{
        id: string;
        handle: string;
        months_in: number | null;
        story_text: string;
        condition: string;
        submitted_at: string;
      }>).map((r) => ({
        id: r.id,
        handle: r.handle,
        monthsIn: r.months_in,
        storyText: r.story_text,
        condition: r.condition,
        submittedAt: r.submitted_at,
      }));
      return NextResponse.json({ stories });
    } else {
      // No Supabase — return empty for MVP
      return NextResponse.json({ stories: [] });
    }
  } catch (err) {
    console.error("[community/stories] GET error:", err);
    return NextResponse.json({ stories: [] });
  }
}
