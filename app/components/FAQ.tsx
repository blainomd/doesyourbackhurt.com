"use client";
import { useState } from "react";
import { siteConfig } from "@/site.config";

const faqs = [
  {
    q: "Is walking good or bad for back pain?",
    a: "Walking is generally beneficial for most types of back pain. It activates the core and back muscles that support the spine, promotes blood flow to disc and muscle tissue, reduces stiffness, and releases endorphins — the body's natural pain relievers. A 2019 Cochrane review found that walking exercise programs are as effective as other exercise interventions for reducing chronic low back pain and disability. Start with short, flat-surface walks of 10–15 minutes and gradually increase duration. Avoid walking if it significantly worsens radiating leg pain (sciatica), as this may indicate a disc herniation or spinal stenosis requiring modification. Walking on a slight incline or swimming may be better tolerated if upright walking is painful. (Source: Steffens D et al., Cochrane 2016; Hurley DA et al., Cochrane 2018.)",
  },
  {
    q: "How do I know if my back pain is a slipped disc?",
    a: "A herniated (slipped) disc is suspected when back pain is accompanied by pain radiating down one leg (sciatica), with numbness, tingling, or weakness in the leg or foot. Specific symptoms help localize the disc level: L4 disc herniation causes pain to the knee and inner shin with possible foot weakness; L5 causes pain into the outer shin and top of the foot; S1 causes pain down the back of the leg and into the heel and outer foot. Pure back pain without leg symptoms is less likely to be disc-related. Diagnosis is confirmed with MRI, which is the standard imaging for disc herniation. However, disc herniations are present in approximately 30–40% of asymptomatic adults on MRI — the disc finding must match the clinical symptoms to be meaningful. (Source: Deyo RA et al., NEJM 2001; Jensen MC et al., NEJM 1994.)",
  },
  {
    q: "When should back pain go to the emergency room?",
    a: "Most back pain does not require emergency care, but several presentations are medical emergencies. Call 911 or go to the ER immediately for: back pain with loss of bladder or bowel control (possible cauda equina syndrome — a surgical emergency requiring decompression within hours); back pain with inability to walk or stand suddenly; back pain with severe leg weakness (not just pain, but actual weakness — foot drop); back pain following significant trauma (fall from height, motor vehicle accident — possible fracture); back pain with fever and rigors (possible spinal epidural abscess or vertebral osteomyelitis); and back pain in a cancer patient (possible metastatic spinal cord compression). Also seek prompt evaluation for: back pain in anyone over 70, unexplained weight loss with back pain, back pain at night that wakes you specifically (not just disturbed sleep), and back pain in an IV drug user. (Source: NICE Low Back Pain Guideline; AHRQ Red Flags in Acute Low Back Pain.)",
  },
  {
    q: "What is sciatica and how long does it last?",
    a: "Sciatica refers to pain that radiates along the path of the sciatic nerve — from the lower back through the buttock and down the leg, sometimes into the foot. It is caused by compression or irritation of one of the nerve roots that form the sciatic nerve, most commonly from a herniated disc or bone spur at the L4–L5 or L5–S1 level. Most cases of acute sciatica improve substantially within 4–6 weeks with conservative treatment. Approximately 90% of people with sciatica recover without surgery within 3 months. Factors associated with longer recovery include severe initial weakness, large disc herniation with significant nerve compression, and older age. Surgery for sciatica (microdiscectomy) provides faster relief of leg pain but does not improve 1–2 year outcomes compared to conservative care in most patients. (Source: Atlas SJ et al., Annals Int Med 2005; Peul WC et al., NEJM 2007.)",
  },
  {
    q: "What exercises help back pain?",
    a: "For acute back pain (less than 6 weeks): gentle movement is better than bed rest, which slows recovery. Short walks, cat-cow stretches, and knee-to-chest stretches are generally well tolerated. For chronic back pain: a combination of core strengthening (plank, bird-dog, dead bug exercises), aerobic exercise (walking, swimming, cycling), and flexibility training reduces pain and disability more effectively than any single type of exercise. McKenzie exercises (extension-based) benefit patients whose pain centralizes (moves from the leg toward the spine) with back extension. Flexion-based exercises (knees to chest, seated forward bend) help spinal stenosis patients whose pain worsens with prolonged standing or extension. A physical therapist can identify which exercise direction is most beneficial for your specific presentation. Avoid high-impact activities and heavy lifting during acute flare-ups. (Source: APTA Low Back Pain CPG 2021; Cochrane Exercise for Chronic LBP Review 2017.)",
  },
  {
    q: "Do I need an MRI for back pain?",
    a: "For most cases of back pain, immediate MRI is not recommended or necessary. Multiple studies have found that routine early MRI does not improve outcomes for nonspecific low back pain, and actually leads to more surgeries and procedures without better results — a phenomenon called 'incidentaloma' where asymptomatic findings lead to treatment of problems that are not causing symptoms. Current guidelines recommend MRI for low back pain when: symptoms have not improved after 4–6 weeks of conservative care; there are 'red flag' symptoms (weakness, numbness, bladder/bowel change, fever, cancer history); or surgery is being considered. For sciatica with significant weakness, MRI within 2 weeks is reasonable. For most people with acute back pain, imaging should wait unless red flags are present. (Source: USPSTF; ACP Low Back Pain Guideline 2017; BMJ Rapid Access to MRI for LBP Trial.)",
  },
  {
    q: "What is spinal stenosis and can it be treated without surgery?",
    a: "Spinal stenosis is narrowing of the spinal canal, which compresses the spinal cord and nerve roots. Symptoms include back and leg pain (neurogenic claudication), numbness, and weakness that worsen with standing and walking and improve with sitting or forward bending (people often describe relief when pushing a shopping cart). It is most common in adults over 60 due to age-related degenerative changes. Most patients manage well without surgery. Conservative treatment includes physical therapy emphasizing flexion-based exercises, NSAIDs, epidural steroid injections, and activity modification. Surgery (decompression laminectomy) is considered when conservative measures fail after 3–6 months and symptoms significantly limit quality of life. The SPORT trial found surgical outcomes superior to nonsurgical at 2 years, but both groups continued to improve. (Source: Weinstein JN et al., NEJM 2008 SPORT Trial; AAOS Spinal Stenosis Guideline.)",
  },
  {
    q: "How effective are epidural steroid injections for back pain?",
    a: "Epidural steroid injections (ESIs) deliver corticosteroids directly into the epidural space to reduce nerve root inflammation. Evidence for benefit varies by indication. For sciatica due to disc herniation: ESIs provide meaningful short-term pain relief (2–6 weeks) and faster functional recovery, though 1–2 year outcomes are similar to non-injection treatment. For spinal stenosis: modest short-term benefit; effects diminish over time. For pure mechanical low back pain without radiculopathy: evidence for benefit is weak. Most pain specialists recommend no more than 3 injections per year at the same site, due to the risk of cartilage and bone loss with repeated corticosteroid exposure. Injections are most valuable as a bridge to allow participation in physical therapy or in the acute phase of a flare. (Source: Roelofs PD et al., Cochrane 2008; SPORT Epidural Trial.)",
  },
  {
    q: "What are the risks of back surgery?",
    a: "Back surgery risks depend on the procedure. Microdiscectomy (for disc herniation with sciatica) is a minimally invasive procedure with generally low complication rates: infection less than 1%, CSF leak 1–3%, recurrent disc herniation in the same location in 5–10% of cases, and a small risk of nerve injury. Spinal fusion carries higher risks: infection 1–3%, hardware failure, adjacent segment disease (accelerated degeneration at the levels above and below the fusion), and a 10–20% rate of persistent or worsened pain (often called 'failed back surgery syndrome'). Patient selection is critical — surgery for the wrong indication has higher failure rates than conservative care. The best candidates for fusion surgery are those with instability confirmed on imaging and consistent disabling symptoms despite comprehensive nonsurgical treatment. (Source: AAOS Spine Surgery Guideline; Cochrane Spinal Fusion Review 2021.)",
  },
  {
    q: "What is the difference between a chiropractor, physical therapist, and spine surgeon for back pain?",
    a: "Each provider has a distinct role. A physical therapist (PT) is trained in movement analysis, exercise prescription, manual therapy, and rehabilitation. Strong evidence supports PT for acute and chronic low back pain — PT reduces pain, improves function, and reduces healthcare utilization. First-line care for most back pain should begin with PT. A chiropractor performs spinal manipulation, which provides similar short-term pain relief to PT for acute low back pain with comparable safety. Chiropractic care has less evidence than PT for chronic back pain and radiculopathy. A spine surgeon evaluates structural causes of back pain and performs procedures when indicated. Surgery is appropriate in a minority of back pain cases — good surgeons typically exhaust conservative options first. A good starting point for most back pain is a primary care physician or directly a physical therapist. (Source: ACP Low Back Pain Guideline 2017; APTA LBP CPG 2021.)",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-surface" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: siteConfig.accentColor }}>
            Frequently asked questions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real questions patients ask about back pain. Answers reviewed by Josh Emdur, DO, board-certified internal medicine physician.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={open === i}>
                <span className="font-semibold text-gray-900 leading-snug">{item.q}</span>
                <svg className="w-5 h-5 flex-shrink-0 transition-transform"
                  style={{ color: siteConfig.primaryColor, transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          This information is for educational purposes only and does not constitute medical advice. Consult a qualified healthcare provider for diagnosis and treatment.
        </p>
      </div>
    </section>
  );
}
