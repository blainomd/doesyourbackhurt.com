// ============================================================
// site.config.ts — THE ONLY FILE YOU NEED TO EDIT
// ============================================================

export const siteConfig = {
  // ── Basic ──────────────────────────────────────────────────
  name: "Does Your Back Hurt",
  domain: "doesyourbackhurt.com",
  tagline: "Get answers about your back pain today.",
  description:
    "Free AI-powered back pain assessment. Understand herniated discs, sciatica, spinal stenosis, and when to see a spine specialist. No login required.",

  // ── Branding ───────────────────────────────────────────────
  primaryColor: "#0D7377",
  accentColor: "#1B2A4A",

  // ── Sage Chat Configuration ────────────────────────────────
  chatChannel: "doesyourbackhurt",
  voiceSite: "doesyourbackhurt",

  // ── Hero Section ───────────────────────────────────────────
  heroTitle: "Most back pain\nis not surgical.\nSeeing that clearly changes what you do next.",
  heroSubtitle:
    "AI explains what your pain pattern means for you. A physician attests the right next step — PT, imaging, or specialist — so you go in informed, not guessing.",

  // ── Risk Factors / Key Information ─────────────────────────
  sections: [
    {
      title: "Herniated Disc (Sciatica)",
      description:
        "Pain radiating from the low back down one leg is caused by disc herniation pressing on a nerve root. L5–S1 disc herniation causes pain down the back of the leg into the heel. Approximately 90% of sciatica patients recover without surgery within 3 months. Surgery (microdiscectomy) provides faster leg pain relief but does not improve 1–2 year outcomes compared to conservative care. (SPORT Trials, NEJM)",
      href: "#assessment",
    },
    {
      title: "Spinal Stenosis",
      description:
        "Narrowing of the spinal canal that compresses nerve roots. Classic presentation: leg pain, cramping, or weakness that worsens with standing and walking and relieves with sitting or forward bending. People often describe relief when pushing a shopping cart. Most patients manage well without surgery. Physical therapy with flexion-based exercises and epidural steroid injections are first-line. (SPORT Trials; AAOS Stenosis Guideline)",
      href: "#assessment",
    },
    {
      title: "Muscle Strain and Nonspecific LBP",
      description:
        "Nonspecific low back pain — where no specific structural cause is identified — accounts for 90–95% of back pain seen in primary care. Most acute cases resolve within 4–6 weeks with rest, heat, NSAIDs, and continued activity. Bed rest delays recovery. Heat applied to the low back is the most evidence-supported physical modality for acute LBP. (ACP 2017; StatPearls NBK538173)",
      href: "#assessment",
    },
    {
      title: "Chronic Back Pain",
      description:
        "Chronic low back pain (>3 months) affects 23% of adults worldwide and is the leading cause of disability globally. Exercise therapy and cognitive behavioral therapy are evidence-based first-line treatments. TENS units, passive modalities, and long-term opioids are not recommended. Pain does not equal damage — a sensitized nervous system drives most chronic LBP. (WHO GBD; ACP 2017)",
      href: "#pain-duration",
    },
    {
      title: "Physical Therapy: What Works",
      description:
        "PT (6–12 sessions) combining individual exercise, manual therapy, and pain neuroscience education is as effective as surgery for most disc herniation and stenosis patients at 1–2 years. McKenzie extension exercises help when pain centralizes with extension. Flexion-based exercises (pelvic tilts, knee hugs) help stenosis. Core stabilization (plank, bird-dog, dead bug) reduces chronic LBP. A PT should identify your directional preference first. (APTA 2021)",
      href: "https://kineticfirst.com/?ref=doesyourbackhurt",
    },
    {
      title: "When Surgery is Actually Indicated",
      description:
        "Surgery helps a minority of back pain patients — but helps dramatically when appropriate. Microdiscectomy for sciatica with persistent neurological deficit after 6 weeks. Decompression laminectomy for stenosis causing disabling neurogenic claudication. Spinal fusion for structural instability or progressive deformity — NOT for nonspecific back pain. Failed back surgery syndrome occurs in 10–40% of fusions for nonspecific pain. (SPORT Trials; Cochrane Spinal Fusion Review 2021)",
      href: "https://surgeonvalue.com",
    },
  ],

  // ── Conversation Starters ──────────────────────────────────
  conversationStarters: [
    "My pain shoots down my leg — is that sciatica?",
    "Should I get an MRI for my back pain?",
    "What exercises actually help back pain?",
    "How do I know if I need back surgery?",
  ],

  // ── Warning Signs ──────────────────────────────────────────
  warningSigns: [
    "Back pain after a fall or injury",
    "Pain radiating down the leg with numbness",
    "Weakness in the legs or difficulty walking",
    "Bladder or bowel control problems",
    "Back pain with fever or unexplained weight loss",
    "Night pain that wakes you from sleep",
    "Progressive worsening despite rest",
    "Back pain in a child or teenager",
  ],

  // ── Ecosystem Links ────────────────────────────────────────
  ecosystemLinks: {
    surgeonvalue: "https://www.surgeonvalue.com",
    coopccare: "https://www.co-op.care",
    solvinghealth: "https://solvinghealth.com",
  },

  // ── MCP Connector ──────────────────────────────────────────
  connectorKey: "doesyourbackhurt",

  // ── Find Care ───────────────────────────────────────────────
  specialistType: "Spine Specialist",
  zocdocSearch: "https://www.zocdoc.com/search?dr_specialty=orthopedic-surgery&reason_visit=back-pain",
  surgeonvalueSearch: "https://www.surgeonvalue.com",

  // ── Recommended Products ───────────────────────────────────
  products: [
    { name: "Lumbar Support Cushion", price: "$30", amazon: "https://www.amazon.com/s?k=lumbar+support+cushion", hsa: true, desc: "Supports the lower back curve during sitting" },
    { name: "Heating Pad (Large)", price: "$30", amazon: "https://www.amazon.com/s?k=heating+pad+back+pain", hsa: true, desc: "Heat therapy to relax tight back muscles" },
    { name: "TENS Unit", price: "$35", amazon: "https://www.amazon.com/s?k=TENS+unit+back+pain", hsa: true, desc: "Electrical nerve stimulation for back pain relief" },
    { name: "Foam Roller", price: "$25", amazon: "https://www.amazon.com/s?k=foam+roller+back+pain", hsa: false, desc: "Self-myofascial release for tight back muscles" },
    { name: "Inversion Table", price: "$120", amazon: "https://www.amazon.com/s?k=inversion+table+back+pain", hsa: false, desc: "Decompresses the spine to relieve disc pressure" },
    { name: "Posture Corrector", price: "$20", amazon: "https://www.amazon.com/s?k=posture+corrector+back+brace", hsa: true, desc: "Improves posture and reduces strain on the spine" },
  ],
};
