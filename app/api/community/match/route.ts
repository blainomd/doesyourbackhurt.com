import { NextRequest, NextResponse } from "next/server";

// ─── Supabase helpers ────────────────────────────────────────────────
// Uses Supabase if SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
// Falls back to console logging for local/MVP use.

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function hasSupabase() {
  return !!(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseInsertMatchRequest(request: {
  id: string;
  condition: string;
  condition_name: string;
  stage: string;
  concern: string;
  help_type: string;
  email: string;
  status: string;
  submitted_at: string;
}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/community_match_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${text}`);
  }
}

// ─── POST — submit a peer match request ──────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stage, concern, helpType, email, condition, conditionName } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!helpType || typeof helpType !== "string") {
      return NextResponse.json({ error: "Help type is required." }, { status: 400 });
    }
    if (!condition || typeof condition !== "string") {
      return NextResponse.json({ error: "Condition is required." }, { status: 400 });
    }

    const matchRequest = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      condition: condition.trim().toLowerCase(),
      condition_name: (conditionName || condition).trim(),
      stage: (stage || "").trim(),
      concern: (concern || "").trim().slice(0, 200),
      help_type: helpType.trim(),
      email: email.trim().toLowerCase(),
      status: "pending",
      submitted_at: new Date().toISOString(),
    };

    if (hasSupabase()) {
      await supabaseInsertMatchRequest(matchRequest);
    } else {
      // Log to console — review manually for MVP matching
      console.log("[community/match] New match request (no Supabase configured):", JSON.stringify(matchRequest, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[community/match] POST error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
