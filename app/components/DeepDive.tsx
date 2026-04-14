"use client";
import { useState } from "react";
import { siteConfig } from "@/site.config";

const articles = [
  {
    title: "Back pain emergencies: red flag symptoms to know",
    tag: "When to Worry",
    body: `The vast majority of back pain is benign and self-limiting. But a small percentage of cases — perhaps 1–2% — indicate a serious underlying condition requiring immediate attention.

Cauda equina syndrome is the most feared spinal emergency. It occurs when a massive disc herniation or other pathology compresses the bundle of nerve roots at the base of the spine. Classic presentation: back pain with saddle anesthesia (numbness in the groin and inner thighs), new bladder dysfunction (retention or incontinence), new bowel dysfunction, and bilateral leg weakness. This is a true neurosurgical emergency — outcomes after surgical decompression within 24–48 hours are dramatically better than with delayed treatment.

Spinal epidural abscess: a bacterial infection in the epidural space. Presents with progressive back pain, fever, and neurological deficits. Risk factors include IV drug use, recent spinal procedures, diabetes, and immunosuppression. Requires urgent MRI and IV antibiotics, often with surgical drainage.

Vertebral fracture in osteoporosis: older adults with osteoporosis may sustain a vertebral compression fracture from minimal trauma or even spontaneously. Acute severe mid-back or lower back pain in an older adult — especially a woman over 70 — should prompt X-ray. Most vertebral fractures heal conservatively; some require vertebroplasty or kyphoplasty.

Metastatic cancer: back pain in a patient with known cancer, recent unexplained weight loss, or age over 50 with no prior back pain history requires imaging to rule out metastatic disease.

Source: NICE Cauda Equina Syndrome Emergency Guideline; AHRQ Back Pain Red Flag Criteria; AAOS Spinal Emergency Recognition.`,
  },
  {
    title: "What to expect at a spine evaluation appointment",
    tag: "Doctor Visit",
    body: `A spine evaluation begins with a detailed history and physical examination. The history focuses on: pain location and radiation, onset and duration, aggravating and relieving factors (extension worsens stenosis; flexion worsens disc problems), prior back pain episodes and treatments, and red flag symptoms.

The physical examination assesses posture, gait, lumbar range of motion, and neurological function. The straight leg raise test — lifting the leg while flat on the back — reproduces sciatica pain if positive (approximately 80% sensitive for L4–L5 or L5–S1 disc herniation with radiculopathy). Strength testing of key muscle groups (hip flexors, knee extension, ankle dorsiflexion and plantarflexion) and sensory testing of the dermatomal distribution of each nerve root localizes the affected level.

For most patients with acute nonspecific low back pain, no imaging is ordered at the first visit, consistent with multiple guidelines recommending against routine early imaging. X-rays are appropriate when fracture, cancer, or infection is suspected. MRI is ordered if red flag symptoms are present, if symptoms have not improved after 4–6 weeks, or if surgery is being considered.

If imaging is ordered, remember: findings must be correlated with symptoms. 30–40% of asymptomatic adults have disc bulges or herniations visible on MRI. An "abnormal" MRI in someone whose symptoms are not consistent with the imaging finding is less meaningful than a "normal" MRI in someone with classic sciatica symptoms.

Source: ACP Low Back Pain Guideline 2017; AAOS Imaging for LBP Recommendations; Choosing Wisely Back Pain Imaging.`,
  },
  {
    title: "Back pain treatment: from physical therapy to surgery",
    tag: "Treatment Options",
    body: `Back pain treatment follows a stepped approach: conservative measures first, invasive procedures when indicated.

Acute nonspecific low back pain (less than 6 weeks): the current evidence-based first-line treatment is reassurance (most cases resolve within 4–6 weeks), continued activity as tolerated (not bed rest), superficial heat (most effective physical modality for acute LBP), and NSAIDs or acetaminophen for pain. Muscle relaxants are modestly effective for acute back pain but cause significant sedation and should be used only short-term. Opioids are not recommended for acute nonspecific back pain due to limited evidence of benefit and high risk of dependence.

Physical therapy: the most evidence-supported treatment for both acute and chronic back pain. A course of PT (typically 6–12 sessions) that includes individualized exercise, manual therapy, and education reduces both pain and disability. PT is as effective as surgery for most herniated disc and spinal stenosis patients at 1–2 years.

Epidural steroid injections: provide 2–6 weeks of relief for radiculopathy, allowing participation in PT. Facet joint injections and medial branch blocks address facetogenic pain.

Surgery: microdiscectomy for disc herniation with persistent radiculopathy after 6 weeks of failed conservative care; laminectomy for spinal stenosis with disabling neurogenic claudication; spinal fusion for instability or progressive deformity — not for nonspecific back pain. Surgery for the right indication, in the right patient, provides durable relief. Surgery for disc pain without radiculopathy has poor outcomes.

Source: ACP 2017 LBP Guideline; SPORT Trials NEJM 2006–2008; Cochrane PT for Chronic LBP 2017.`,
  },
  {
    title: "Recovering from a back injury or back surgery",
    tag: "Recovery and Prevention",
    body: `Recovery from a significant back injury or back surgery follows predictable stages, but is highly individual depending on the diagnosis, treatment, and patient factors.

After microdiscectomy for disc herniation: most patients feel immediate leg pain relief upon waking from anesthesia. Walking the same day is encouraged. Hospital stay is typically less than 24 hours. Lifting restrictions (nothing over 10–20 lbs) apply for 4–6 weeks. Return to desk work at 2–4 weeks; physical labor at 6–8 weeks. Physical therapy beginning at 4–6 weeks focuses on core stabilization and gradual return to activity. The 1-year recurrence rate for the same disc level is approximately 5–10%.

After spinal fusion: a more significant recovery. Mobilization begins the day after surgery. Fusion hardware is stable immediately, but bone healing takes 3–6 months. Activity restrictions are more significant — typically no bending, lifting, or twisting for 3 months. Physical therapy starts at 4–6 weeks and continues for 3–6 months. Many patients achieve significant pain relief at 3–6 months, with continued improvement through 12 months.

Preventing recurrence: the best evidence for back pain prevention is regular exercise maintaining core strength and flexibility, avoiding prolonged static postures, using proper lifting techniques (load close to the body, avoid combined bending and twisting), maintaining a healthy weight, and not smoking (smoking impairs disc nutrition and delays healing). Lumbar supports have limited evidence for prevention but may help some people during heavy lifting.

Source: AAOS Post-Surgical Rehabilitation Guidelines; Cochrane Back Pain Prevention Review; ACSM Core Training Evidence Summary.`,
  },
  {
    title: "Living with chronic back pain: a practical guide",
    tag: "Living With the Condition",
    body: `Chronic back pain — lasting more than 12 weeks — affects approximately 20% of adults and is the leading cause of disability globally. Managing it well requires a biopsychosocial approach: addressing the physical, psychological, and social dimensions simultaneously.

Pain neuroscience education (PNE) is one of the most important advances in chronic pain management. Understanding that chronic back pain is often driven by a sensitized nervous system — not necessarily ongoing tissue damage — fundamentally changes how patients relate to their pain. Patients who receive PNE have significantly better outcomes, less fear-avoidance behavior, and improved physical function. Pain does not equal damage in chronic low back pain.

Sleep and back pain are bidirectional: poor sleep worsens pain sensitivity, and pain disrupts sleep. Addressing sleep (sleep hygiene, treating sleep apnea, in some cases short-term sleep medication) is part of chronic back pain management, not separate from it.

Psychological factors — depression, anxiety, catastrophizing, and fear-avoidance beliefs (avoiding activity because you fear it will cause harm) — are strong predictors of chronic disability from back pain, sometimes stronger than imaging findings. Cognitive behavioral therapy (CBT) and acceptance and commitment therapy (ACT) reduce chronic back pain-related disability. These are not suggestions that pain is "in your head" — they are evidence-based treatments that address how the brain processes persistent pain signals.

Work: 40–50% of people with chronic back pain experience work disability. Early return to modified duty (lighter work, ergonomic modifications) during recovery reduces the risk of permanent disability far better than prolonged rest.

Source: Moseley GL, Pain Neuroscience Education; Cochrane CBT for Chronic LBP 2021; WHO Global Burden of Disease Back Pain Report.`,
  },
];

export function DeepDive() {
  const [active, setActive] = useState(0);
  const article = articles[active];

  return (
    <section className="py-20" id="deep-dive">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            Back pain in depth
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Evidence-based articles for patients who want to understand more.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {articles.map((a, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
              style={active === i ? { backgroundColor: siteConfig.primaryColor, color: "#fff" } : { backgroundColor: "#f3f4f6", color: "#6b7280" }}>
              {a.tag}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: siteConfig.primaryColor + "18", color: siteConfig.primaryColor }}>
            {article.tag}
          </span>
          <h3 className="text-xl font-bold mb-5" style={{ color: siteConfig.accentColor }}>{article.title}</h3>
          <div className="space-y-4">
            {article.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-sm">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
