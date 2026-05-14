import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://uhizqukdctkvluluheux.supabase.co/rest/v1/email_captures";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoaXpxdWtkY3Rrdmx1bHVoZXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzQ1ODQsImV4cCI6MjA4OTQ1MDU4NH0._AxT5pBEi1GZ167JPJpHeg_k1E0Bbtzyj3UPKdTFEug";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const r = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: "Bearer " + SUPABASE_KEY,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        brand: "doesyourbackhurt.com",
        source: "doesyourbackhurt_waitlist",
        metadata: { ...body },
      }),
    });

    if (!r.ok && r.status !== 201) {
      const b = await r.json().catch(() => ({}));
      if ((b as { code?: string })?.code !== "23505") {
        return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
      }
    }

    return NextResponse.json({ message: "Subscribed" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
