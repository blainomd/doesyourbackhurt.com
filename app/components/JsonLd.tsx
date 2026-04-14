interface JsonLdProps {
  conditionName: string;
  conditionDescription: string;
  icd10Codes: string[];
  specialistType: string;
  domain: string;
}

export function JsonLd({ conditionName, conditionDescription, icd10Codes, specialistType, domain }: JsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://${domain}/#webpage`,
        name: `${conditionName} Guide — ${domain}`,
        description: conditionDescription,
        url: `https://${domain}`,
        inLanguage: 'en-US',
        dateReviewed: '2025-04-01',
        lastReviewed: '2025-04-01',
        isPartOf: { '@id': `https://${domain}/#website` },
        about: {
          '@type': 'MedicalCondition',
          name: conditionName,
          code: icd10Codes.map(code => ({
            '@type': 'MedicalCode',
            codeValue: code,
            codingSystem: 'ICD-10',
          })),
          relevantSpecialty: {
            '@type': 'MedicalSpecialty',
            name: specialistType,
          },
        },
        reviewedBy: {
          '@type': 'Physician',
          '@id': 'https://altru.care/#physician',
          name: 'Josh Emdur, DO',
          honorificSuffix: 'DO',
          description: 'Board Certified Internal Medicine physician. Licensed in all 50 states. Medical Director, co-op.care.',
          url: 'https://altru.care',
          affiliation: {
            '@type': 'MedicalOrganization',
            name: 'co-op.care',
            url: 'https://co-op.care',
          },
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Medical License',
            recognizedBy: { '@type': 'Organization', name: 'All 50 US States' },
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `https://${domain}/#website`,
        url: `https://${domain}`,
        name: `${conditionName} — ${domain}`,
        publisher: {
          '@type': 'MedicalOrganization',
          name: 'co-op.care',
          url: 'https://co-op.care',
          logo: 'https://co-op.care/logo.svg',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is walking good or bad for back pain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Walking is generally beneficial for most types of back pain. It activates core and back muscles, promotes blood flow to disc and muscle tissue, reduces stiffness, and releases endorphins. A 2019 Cochrane review found walking programs as effective as other exercise interventions for chronic low back pain. Start with 10-15 minutes on flat surfaces and gradually increase. Avoid walking if it significantly worsens radiating leg pain, which may indicate disc herniation or spinal stenosis requiring modification.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I know if my back pain is a slipped disc?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A herniated disc is suspected when back pain radiates down one leg (sciatica) with numbness, tingling, or weakness. Specific patterns help localize the level: L4 causes pain to the knee and inner shin; L5 to the outer shin and top of foot; S1 down the back of the leg to the heel. Pure back pain without leg symptoms is less likely to be disc-related. Disc herniations are present in 30-40% of asymptomatic adults on MRI — the finding must match the clinical symptoms to be meaningful.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should back pain go to the emergency room?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Call 911 or go to the ER for: back pain with loss of bladder or bowel control (possible cauda equina syndrome — requires surgical decompression within hours); sudden inability to walk or stand; severe new leg weakness (foot drop); back pain after significant trauma; back pain with fever and rigors (possible spinal epidural abscess); back pain in a cancer patient (possible metastatic spinal cord compression). Seek prompt evaluation for: back pain in anyone over 70, unexplained weight loss with back pain, and back pain at night that specifically wakes you.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is sciatica and how long does it last?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sciatica is pain that radiates from the lower back through the buttock and down the leg, caused by compression or irritation of a nerve root, most commonly from a herniated disc at L4-L5 or L5-S1. Most cases improve substantially within 4-6 weeks. Approximately 90% of people with sciatica recover without surgery within 3 months. Surgery (microdiscectomy) provides faster relief of leg pain but does not improve 1-2 year outcomes compared to conservative care in most patients.',
            },
          },
          {
            '@type': 'Question',
            name: 'What exercises help back pain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For acute back pain: gentle movement is better than bed rest. Short walks, cat-cow stretches, and knee-to-chest stretches are generally well tolerated. For chronic back pain: core strengthening (plank, bird-dog, dead bug), aerobic exercise (walking, swimming, cycling), and flexibility training reduces pain more effectively than any single approach. McKenzie extension exercises benefit patients whose pain centralizes toward the spine with back extension. A physical therapist can identify which exercise direction works best for your presentation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need an MRI for back pain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For most back pain, immediate MRI is not necessary or recommended. Routine early MRI does not improve outcomes for nonspecific low back pain and leads to more procedures without better results. Guidelines recommend MRI when: symptoms have not improved after 4-6 weeks; red flag symptoms are present (weakness, numbness, bladder or bowel change, fever, cancer history); or surgery is being considered. For sciatica with significant weakness, MRI within 2 weeks is reasonable.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is spinal stenosis and can it be treated without surgery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Spinal stenosis is narrowing of the spinal canal that compresses nerve roots, causing back and leg pain that worsens with standing and walking and improves with sitting or forward bending. Most common after age 60. Conservative treatment — physical therapy with flexion exercises, NSAIDs, and epidural steroid injections — manages most patients without surgery. Surgery (decompression laminectomy) is considered when conservative measures fail after 3-6 months. The SPORT trial found surgical outcomes superior at 2 years, but both groups continued to improve.',
            },
          },
          {
            '@type': 'Question',
            name: 'How effective are epidural steroid injections for back pain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Epidural steroid injections (ESIs) deliver corticosteroids into the epidural space to reduce nerve root inflammation. For sciatica due to disc herniation, ESIs provide meaningful short-term pain relief (2-6 weeks) and faster functional recovery, though 1-2 year outcomes are similar to non-injection treatment. For pure mechanical low back pain without radiculopathy, evidence is weak. Most specialists recommend no more than 3 injections per year at the same site. Injections are most valuable as a bridge to allow participation in physical therapy.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the risks of back surgery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microdiscectomy carries low complication rates: infection under 1%, CSF leak 1-3%, recurrent herniation in 5-10%. Spinal fusion carries higher risks: infection 1-3%, hardware failure, adjacent segment disease, and a 10-20% rate of persistent or worsened pain (failed back surgery syndrome). Patient selection is critical — surgery for the wrong indication has higher failure rates than conservative care. The best fusion candidates have instability confirmed on imaging and consistent disabling symptoms despite comprehensive nonsurgical treatment.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between a chiropractor, physical therapist, and spine surgeon for back pain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A physical therapist (PT) provides exercise prescription, manual therapy, and rehabilitation — strong evidence supports PT for acute and chronic low back pain as first-line care. A chiropractor performs spinal manipulation, providing similar short-term pain relief to PT for acute low back pain. A spine surgeon evaluates structural causes and performs procedures when indicated — appropriate for a minority of cases. Good surgeons exhaust conservative options first. For most back pain, start with a primary care physician or directly a physical therapist.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
